import type { TaskConfig, TaskStatus } from '@/types'
import { fetchManager } from '@/lib/background'
import { backupService } from '@/lib/background/backupService'
import { taskScheduler } from '@/lib/background/TaskScheduler'
import { storageManager } from '@/lib/storageManager'

export async function getTaskStatus(taskId: string): Promise<TaskStatus> {
  const statuses = await storageManager.getTaskStatuses()
  return (
    statuses[taskId] || {
      id: taskId,
      status: 'idle',
      message: '',
      progress: 0,
      lastRun: 0,
      nextRun: 0,
    }
  )
}

export async function updateTaskConfig(
  taskId: string,
  config: Partial<TaskConfig>,
) {
  await taskScheduler.updateTaskSchedule(taskId, config)
}

export async function executeTask(taskId: string) {
  try {
    console.log(`Starting task execution: ${taskId}`)

    // 更新任务状态
    await storageManager.updateTaskStatus(taskId, {
      status: 'running',
      message: '正在获取数据...',
      progress: 0,
      lastRun: Date.now(),
    })

    // 获取任务配置
    const tasks = await storageManager.getTasks()
    const task = tasks.find(t => t.id === taskId)
    if (!task) {
      throw new Error('任务不存在')
    }

    console.log(`Task ${taskId} backup starting:`, {
      username: task.username,
      isFirstBackup: task.isFirstBackup,
    })

    // 执行备份
    const backupData = await backupService.runBackup(task, fetchManager)

    console.log(`Task ${taskId} backup completed:`, {
      posts: backupData.weibo.length,
      user: backupData.user.name,
    })

    // 保存备份数据
    await storageManager.saveBackupData(taskId, backupData)

    // 计算下次运行时间
    const now = Date.now()
    const nextRunTime = now + task.interval * 60 * 1000

    // 更新任务配置
    await storageManager.updateTask(taskId, {
      lastCheck: now,
      nextRunTime,
      totalPosts: backupData.weibo.length,
      isFirstBackup: false,
    })

    // 计算新增微博数量
    const previousTotal = task.totalPosts
    const currentTotal = backupData.weibo.length
    const newPostsAdded = Math.max(0, currentTotal - previousTotal)

    // 生成成功消息
    let successMessage = ''
    if (task.isFirstBackup) {
      successMessage = `备份完成，共获取 ${backupData.weibo.length} 条最近微博`
    }
    else {
      successMessage = `增量备份完成，新增 ${newPostsAdded} 条微博，总计 ${backupData.weibo.length} 条`
    }

    // 更新任务状态
    await storageManager.updateTaskStatus(taskId, {
      status: 'success',
      message: successMessage,
      progress: 100,
      lastRun: now,
      nextRun: nextRunTime,
    })

    console.log(
      `Task ${taskId} completed successfully, next run: ${new Date(nextRunTime).toLocaleString()}`,
    )
  }
  catch (error) {
    console.error(`Task ${taskId} failed:`, error)

    const now = Date.now()
    const nextRunTime = now + 30 * 60 * 1000 // 错误后30分钟重试

    // 更新任务的下次运行时间
    await storageManager.updateTask(taskId, {
      nextRunTime,
    })

    await storageManager.updateTaskStatus(taskId, {
      status: 'error',
      message: (error as Error).message,
      progress: 0,
      lastRun: now,
      nextRun: nextRunTime,
    })
  }
}
