import type { TaskConfig } from '@/types/storage'
import { storageManager } from '@/lib/storageManager'

export interface SchedulerConfig {
  checkInterval: number // 检查间隔（毫秒）
  maxConcurrentTasks: number // 最大并发任务数
  retryDelay: number // 重试延迟（毫秒）
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

export type TaskExecutor = (taskId: string) => Promise<void>

export interface SchedulerStats {
  totalTasks: number
  enabledTasks: number
  runningTasks: number
  completedTasks: number
  failedTasks: number
  nextRunTime: number | null
  lastCheckTime: number
}

/**
 * 统一的任务调度器
 * 负责管理所有备份任务的执行时间和状态
 */
export class TaskScheduler {
  private timer: NodeJS.Timeout | null = null
  private runningTasks = new Map<string, boolean>()
  private isRunning = false
  private stats: SchedulerStats = {
    totalTasks: 0,
    enabledTasks: 0,
    runningTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    nextRunTime: null,
    lastCheckTime: 0,
  }

  constructor(
    private config: SchedulerConfig,
    private taskExecutor: TaskExecutor,
  ) {
    this.log('info', 'TaskScheduler initialized', { config })
  }

  /**
   * 启动调度器
   */
  start(): void {
    if (this.isRunning) {
      this.log('warn', 'Scheduler is already running')
      return
    }

    this.isRunning = true
    this.timer = setInterval(() => {
      this.checkAndRunTasks()
    }, this.config.checkInterval)

    this.log('info', 'Scheduler started', {
      checkInterval: this.config.checkInterval,
    })

    // 立即检查一次
    this.checkAndRunTasks()
  }

  /**
   * 停止调度器
   */
  stop(): void {
    if (!this.isRunning) {
      this.log('warn', 'Scheduler is not running')
      return
    }

    this.isRunning = false

    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    this.log('info', 'Scheduler stopped')
  }

  /**
   * 检查并运行到期的任务
   */
  private async checkAndRunTasks(): Promise<void> {
    if (!this.isRunning)
      return

    const now = Date.now()
    this.stats.lastCheckTime = now

    try {
      const tasks = await storageManager.getTasks()
      this.updateStats(tasks)

      const tasksToRun = this.getTasksToRun(tasks, now)

      if (tasksToRun.length > 0) {
        this.log('info', `Found ${tasksToRun.length} tasks ready to run`, {
          tasks: tasksToRun.map(t => ({ id: t.id, username: t.username })),
        })

        await this.executeTasks(tasksToRun)
      }
      else {
        this.log('debug', 'No tasks ready to run')
      }

      // 计算下次运行时间
      this.updateNextRunTime(tasks)
    }
    catch (error) {
      this.log('error', 'Error in checkAndRunTasks', { error })
    }
  }

  /**
   * 获取需要运行的任务
   */
  private getTasksToRun(tasks: TaskConfig[], now: number): TaskConfig[] {
    const tasksToRun: TaskConfig[] = []
    const runningCount = this.runningTasks.size

    for (const task of tasks) {
      // 跳过禁用的任务
      if (!task.enabled)
        continue

      // 跳过正在运行的任务
      if (this.runningTasks.get(task.id))
        continue

      // 检查并发限制
      if (runningCount + tasksToRun.length >= this.config.maxConcurrentTasks) {
        this.log('debug', 'Reached max concurrent tasks limit', {
          maxConcurrent: this.config.maxConcurrentTasks,
          current: runningCount + tasksToRun.length,
        })
        break
      }

      // 检查是否到了运行时间
      if (this.shouldRunTask(task, now)) {
        tasksToRun.push(task)
      }
    }

    return tasksToRun
  }

  /**
   * 判断任务是否应该运行
   */
  private shouldRunTask(task: TaskConfig, now: number): boolean {
    // 如果没有设置下次运行时间，不运行
    if (!task.nextRunTime || task.nextRunTime === 0) {
      return false
    }

    // 如果到了运行时间
    return task.nextRunTime <= now
  }

  /**
   * 执行任务列表
   */
  private async executeTasks(tasks: TaskConfig[]): Promise<void> {
    const promises = tasks.map(task => this.executeTask(task))
    await Promise.allSettled(promises)
  }

  /**
   * 执行单个任务
   */
  private async executeTask(task: TaskConfig): Promise<void> {
    const taskId = task.id

    if (this.runningTasks.get(taskId)) {
      this.log('warn', `Task ${taskId} is already running`)
      return
    }

    this.runningTasks.set(taskId, true)
    this.stats.runningTasks = this.runningTasks.size

    this.log('info', 'Starting task execution', {
      taskId,
      username: task.username,
      isFirstBackup: task.isFirstBackup,
    })

    try {
      await this.taskExecutor(taskId)
      this.stats.completedTasks++
      this.log('info', 'Task completed successfully', {
        taskId,
        username: task.username,
      })
    }
    catch (error) {
      this.stats.failedTasks++
      this.log('error', 'Task execution failed', {
        taskId,
        username: task.username,
        error: (error as Error).message,
      })
    }
    finally {
      this.runningTasks.delete(taskId)
      this.stats.runningTasks = this.runningTasks.size
    }
  }

  /**
   * 更新统计信息
   */
  private updateStats(tasks: TaskConfig[]): void {
    this.stats.totalTasks = tasks.length
    this.stats.enabledTasks = tasks.filter(t => t.enabled).length
    this.stats.runningTasks = this.runningTasks.size
  }

  /**
   * 更新下次运行时间
   */
  private updateNextRunTime(tasks: TaskConfig[]): void {
    const enabledTasks = tasks.filter(t => t.enabled && t.nextRunTime > 0)

    if (enabledTasks.length === 0) {
      this.stats.nextRunTime = null
      return
    }

    const nextRunTimes = enabledTasks.map(t => t.nextRunTime)
    this.stats.nextRunTime = Math.min(...nextRunTimes)
  }

  /**
   * 计算任务的下次运行时间
   */
  static calculateNextRunTime(task: TaskConfig): number {
    const now = Date.now()
    const intervalMs = task.interval * 60 * 1000

    // 如果是首次备份或从未运行过，立即运行
    if (task.isFirstBackup || !task.lastCheck) {
      return now + 5000 // 5秒后运行
    }

    // 如果最后检查时间 + 间隔 <= 现在，说明应该立即运行
    const expectedNextRun = task.lastCheck + intervalMs
    if (expectedNextRun <= now) {
      return now + 5000 // 5秒后运行
    }

    // 否则按预期时间运行
    return expectedNextRun
  }

  /**
   * 立即调度任务
   */
  async scheduleTask(taskId: string, delay = 5000): Promise<void> {
    const now = Date.now()
    const nextRunTime = now + delay

    await storageManager.updateTask(taskId, { nextRunTime })

    this.log('info', 'Task scheduled', {
      taskId,
      nextRunTime: new Date(nextRunTime).toLocaleString(),
    })
  }

  /**
   * 取消任务调度
   */
  async unscheduleTask(taskId: string): Promise<void> {
    await storageManager.updateTask(taskId, {
      enabled: false,
      nextRunTime: 0,
    })

    // 如果任务正在运行，标记为需要停止
    if (this.runningTasks.get(taskId)) {
      this.log('warn', `Task ${taskId} is running and will be stopped`)
    }

    this.log('info', 'Task unscheduled', { taskId })
  }

  /**
   * 更新任务调度
   */
  async updateTaskSchedule(
    taskId: string,
    config: Partial<TaskConfig>,
  ): Promise<void> {
    const tasks = await storageManager.getTasks()
    const task = tasks.find(t => t.id === taskId)

    if (!task) {
      throw new Error(`Task ${taskId} not found`)
    }

    const updatedTask = { ...task, ...config }
    const nextRunTime = updatedTask.enabled
      ? TaskScheduler.calculateNextRunTime(updatedTask)
      : 0

    await storageManager.updateTask(taskId, {
      ...config,
      nextRunTime,
    })

    this.log('info', 'Task schedule updated', {
      taskId,
      nextRunTime:
        nextRunTime > 0 ? new Date(nextRunTime).toLocaleString() : 'disabled',
    })
  }

  /**
   * 获取调度器状态
   */
  getStats(): SchedulerStats {
    return { ...this.stats }
  }

  /**
   * 获取正在运行的任务
   */
  getRunningTasks(): string[] {
    return Array.from(this.runningTasks.keys())
  }

  /**
   * 检查任务是否正在运行
   */
  isTaskRunning(taskId: string): boolean {
    return this.runningTasks.get(taskId) === true
  }

  /**
   * 初始化任务调度时间
   */
  async initializeTaskSchedules(): Promise<void> {
    try {
      const config = await storageManager.getConfig()
      if (!config.autoStart) {
        this.log(
          'info',
          'Auto start is disabled, skipping task initialization',
        )
        return
      }

      const tasks = await storageManager.getTasks()
      const now = Date.now()
      let updatedCount = 0

      for (const task of tasks) {
        if (!task.enabled)
          continue

        // 如果任务没有设置下次运行时间，或者时间已过期很久，重新计算
        const shouldUpdateSchedule
          = !task.nextRunTime || task.nextRunTime < now - 24 * 60 * 60 * 1000 // 超过24小时

        if (shouldUpdateSchedule) {
          const nextRunTime = TaskScheduler.calculateNextRunTime(task)
          await storageManager.updateTask(task.id, { nextRunTime })
          updatedCount++

          this.log('info', 'Updated schedule for task', {
            taskId: task.id,
            username: task.username,
            nextRunTime: new Date(nextRunTime).toLocaleString(),
          })
        }
      }

      this.log('info', `Initialized ${updatedCount} task schedules`)
    }
    catch (error) {
      this.log('error', 'Failed to initialize task schedules', { error })
    }
  }

  /**
   * 日志输出
   */
  private log(
    level: SchedulerConfig['logLevel'],
    message: string,
    data?: any,
  ): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    const configLevel = levels[this.config.logLevel]
    const messageLevel = levels[level]

    if (messageLevel >= configLevel) {
      const timestamp = new Date().toISOString()
      const logData = data ? ` ${JSON.stringify(data)}` : ''
      console[level](`[TaskScheduler] ${timestamp} ${message}${logData}`)
    }
  }
}

// 默认配置
export const DEFAULT_SCHEDULER_CONFIG: SchedulerConfig = {
  checkInterval: 60 * 1000, // 每分钟检查一次
  maxConcurrentTasks: 3, // 最多同时运行3个任务
  retryDelay: 30 * 60 * 1000, // 失败后30分钟重试
  logLevel: 'info',
}
