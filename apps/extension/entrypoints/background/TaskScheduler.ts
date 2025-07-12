import type { SchedulerConfig, SchedulerStats } from '@/types'
import type { TaskConfig } from '@/types/storage'
import { DEFAULT_SCHEDULER_CONFIG } from '@/lib/constants'
import { storageManager } from '@/lib/storageManager'
import { backupService } from './backupService'

/**
 * TaskRunner 负责执行单个备份任务的完整逻辑。
 * 它封装了从状态更新、数据备份到结果处理的所有步骤。
 */
class TaskRunner {
  constructor(private task: TaskConfig) {}

  /**
   * 运行备份任务。
   */
  public async run(_taskId?: string): Promise<void> {
    const taskId = _taskId || this.task.id
    console.log(`Starting task execution: ${taskId}`)

    try {
      await this.updateStatus('running', '正在获取数据...', 0)

      const backupData = await backupService.runBackup(this.task)
      await storageManager.saveBackupData(taskId, backupData)

      await this.handleSuccess(backupData)
    }
    catch (error) {
      console.error(`Task ${taskId} failed:`, error)
      await this.handleError(error as Error)
      throw error
    }
  }

  /**
   * 任务成功后的处理
   */
  private async handleSuccess(backupData: any): Promise<void> {
    const now = Date.now()
    const nextRunTime = now + this.task.interval * 60 * 1000

    await storageManager.updateTask(this.task.id, {
      lastCheck: now,
      nextRunTime,
      totalPosts: backupData.weibo.length,
      isFirstBackup: false,
    })

    const previousTotal = this.task.totalPosts || 0
    const currentTotal = backupData.weibo.length
    const newPostsAdded = Math.max(0, currentTotal - previousTotal)

    const successMessage = this.task.isFirstBackup
      ? `备份完成，共获取 ${currentTotal} 条最近微博`
      : `增量备份完成，新增 ${newPostsAdded} 条微博，总计 ${currentTotal} 条`

    await this.updateStatus('success', successMessage, 100, nextRunTime)

    console.log(
      `Task ${this.task.id} completed successfully, next run: ${new Date(nextRunTime).toLocaleString()}`,
    )
  }

  /**
   * 任务失败后的处理
   */
  private async handleError(error: Error): Promise<void> {
    const now = Date.now()

    const nextRunTime = now + 30 * 60 * 1000

    await storageManager.updateTask(this.task.id, {
      nextRunTime,
    })

    await this.updateStatus('error', error.message, 0, nextRunTime)
  }

  /**
   * 统一更新任务运行状态
   */
  private async updateStatus(
    status: 'running' | 'success' | 'error',
    message: string,
    progress: number,
    nextRun?: number,
  ): Promise<void> {
    const now = Date.now()
    await storageManager.updateTaskStatus(this.task.id, {
      status,
      message,
      progress,
      lastRun: now,
      ...(nextRun && { nextRun }),
    })
  }
}

/**
 * 统一的任务调度器
 * 负责管理所有备份任务的执行时间和状态，但不关心任务的具体执行内容。
 */
export class TaskScheduler {
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

  constructor(private config: SchedulerConfig) {
    this.log('info', 'TaskScheduler initialized', { config })
  }

  /**
   * 启动调度器
   */
  public start(): void {
    if (this.isRunning) {
      this.log('warn', 'Scheduler is already running.')
      return
    }

    this.isRunning = true
    setInterval(() => this.checkAndRunTasks(), this.config.checkInterval)
    this.checkAndRunTasks()
  }

  /**
   * 检查并运行到期的任务
   */
  private async checkAndRunTasks(): Promise<void> {
    if (!this.isRunning)
      return

    this.stats.lastCheckTime = Date.now()

    try {
      const allTasks = await storageManager.getTasks()
      this.updateStats(allTasks)

      const tasksToRun = this.getTasksToRun(allTasks)
      if (tasksToRun.length > 0) {
        this.log('info', `Found ${tasksToRun.length} tasks to run.`, {
          tasks: tasksToRun.map(t => ({ id: t.id, username: t.username })),
        })
        await this.executeTasks(tasksToRun)
      }
      else {
        this.log('debug', 'No tasks ready to run.')
      }

      this.updateNextRunTime(allTasks)
    }
    catch (error) {
      this.log('error', 'Error in checkAndRunTasks loop', { error })
    }
  }

  /**
   * 获取需要运行的任务
   */
  private getTasksToRun(tasks: TaskConfig[]): TaskConfig[] {
    const now = Date.now()
    const tasksToRun: TaskConfig[] = []

    for (const task of tasks) {
      if (!task.enabled || this.runningTasks.has(task.id)) {
        continue
      }

      const concurrentLimitReached
        = this.runningTasks.size + tasksToRun.length >= this.config.maxConcurrentTasks
      if (concurrentLimitReached) {
        this.log('debug', 'Max concurrent tasks limit reached.', {
          limit: this.config.maxConcurrentTasks,
        })
        break
      }

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
    if (!task.nextRunTime || task.nextRunTime === 0) {
      return false
    }
    return task.nextRunTime <= now
  }

  /**
   * 并发执行任务列表
   */
  private async executeTasks(tasks: TaskConfig[]): Promise<void> {
    const taskPromises = tasks.map(task => this.executeTask(task))
    await Promise.allSettled(taskPromises)
  }

  /**
   * 执行单个任务，将其委托给 TaskRunner
   */
  async executeTask(task: TaskConfig): Promise<void> {
    const taskId = task.id
    if (this.runningTasks.has(taskId)) {
      this.log('warn', `Task ${taskId} is already running, skipping execution.`)
      return
    }

    this.runningTasks.set(taskId, true)
    this.updateRunningTasksStat()

    this.log('info', 'Starting task execution', { taskId, username: task.username })

    try {
      const runner = new TaskRunner(task)
      await runner.run()
      this.stats.completedTasks++
      this.log('info', 'Task completed successfully', { taskId })
    }
    catch (error) {
      this.stats.failedTasks++
      this.log('error', 'Task execution failed', {
        taskId,
        error: (error as Error).message,
      })
    }
    finally {
      this.runningTasks.delete(taskId)
      this.updateRunningTasksStat()
    }
  }

  /**
   * 更新统计信息
   */
  private updateStats(tasks: TaskConfig[]): void {
    this.stats.totalTasks = tasks.length
    this.stats.enabledTasks = tasks.filter(t => t.enabled).length
    this.updateRunningTasksStat()
  }

  /**
   * 单独更新正在运行的任务数统计
   */
  private updateRunningTasksStat(): void {
    this.stats.runningTasks = this.runningTasks.size
  }

  /**
   * 更新所有任务中最早的下次运行时间
   */
  private updateNextRunTime(tasks: TaskConfig[]): void {
    const nextRunTimes = tasks
      .filter(t => t.enabled && t.nextRunTime && t.nextRunTime > 0)
      .map(t => t.nextRunTime as number)

    this.stats.nextRunTime = nextRunTimes.length > 0 ? Math.min(...nextRunTimes) : null
  }

  /**
   * 计算任务的下次运行时间 (静态工具方法)
   */
  static calculateNextRunTime(task: TaskConfig): number {
    const now = Date.now()

    if (task.isFirstBackup || !task.lastCheck) {
      return now + 5000
    }

    const intervalMs = task.interval * 60 * 1000
    const expectedNextRun = (task.lastCheck || now) + intervalMs

    return expectedNextRun <= now ? now + 5000 : expectedNextRun
  }

  /**
   * 更新任务调度配置
   */
  async updateTaskSchedule(
    taskId: string,
    config: Partial<Pick<TaskConfig, 'enabled' | 'interval'>>,
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

    await storageManager.updateTask(taskId, { ...config, nextRunTime })

    this.log('info', 'Task schedule updated', {
      taskId,
      nextRunTime: nextRunTime > 0 ? new Date(nextRunTime).toLocaleString() : 'disabled',
    })

    this.checkAndRunTasks()
  }

  /**
   * 初始化所有任务的调度时间
   */
  async initializeTaskSchedules(): Promise<void> {
    this.log('info', 'Initializing task schedules...')
    try {
      const tasks = await storageManager.getTasks()
      const now = Date.now()
      let updatedCount = 0

      for (const task of tasks) {
        if (!task.enabled)
          continue

        const shouldUpdate = !task.nextRunTime || task.nextRunTime < now
        if (shouldUpdate) {
          const nextRunTime = TaskScheduler.calculateNextRunTime(task)
          await storageManager.updateTask(task.id, { nextRunTime })
          updatedCount++
          this.log('info', 'Re-scheduled task', {
            taskId: task.id,
            nextRunTime: new Date(nextRunTime).toLocaleString(),
          })
        }
      }
      this.log('info', `Initialized ${updatedCount} task schedules.`)
      this.start()
    }
    catch (error) {
      this.log('error', 'Failed to initialize task schedules', { error })
    }
  }

  /**
   * 日志记录器
   */
  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: any): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    if (levels[level] >= levels[this.config.logLevel]) {
      const logMessage = `[TaskScheduler] [${level.toUpperCase()}] ${message}`
      if (data) {
        console[level](logMessage, data)
      }
      else {
        console[level](logMessage)
      }
    }
  }
}

export const taskScheduler = new TaskScheduler(DEFAULT_SCHEDULER_CONFIG)
