import type { Post } from '@/types'
import type { BackupData, TaskConfig, TaskStatus } from '@/types/storage'
import { onMessage } from 'webext-bridge/background'
import { defineBackground } from 'wxt/utils/define-background'
import { DEFAULT_FETCH_CONFIG } from '@/lib/constants'
import { FetchManager } from '@/lib/fetchManager'
import {
  DEFAULT_SCHEDULER_CONFIG,
  TaskScheduler,
} from '@/lib/scheduler/TaskScheduler'
import { fileSystemManager, storageManager } from '@/lib/storage'
import { getCookies } from '@/lib/utils/cookie'
import {
  DataDeduplicator,
  PaginationController,
} from '@/lib/utils/deduplication'
import { extensionStorage } from '@/lib/utils/storage'

// 全局变量
let fetchManager: FetchManager
let taskScheduler: TaskScheduler
let isInitialized = false

async function initialize() {
  if (isInitialized)
    return

  try {
    // 初始化 FetchManager
    fetchManager = new FetchManager({
      ...DEFAULT_FETCH_CONFIG,
      cookie: '',
    })

    // 初始化 Cookie
    let cookie = await extensionStorage.getItem('cookies')
    if (!cookie) {
      cookie = await getCookies()
      await extensionStorage.setItem('cookies', cookie)
    }
    fetchManager.setCookie(cookie)

    // 初始化任务调度器
    taskScheduler = new TaskScheduler(DEFAULT_SCHEDULER_CONFIG, executeTask)

    setupMessage()

    // 启动调度器并初始化任务
    taskScheduler.start()
    await taskScheduler.initializeTaskSchedules()

    isInitialized = true
    console.log('Background manager initialized with TaskScheduler')
  }
  catch (error) {
    console.error('Failed to initialize background manager:', error)
  }
}

async function executeTask(taskId: string) {
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
    const backupData = await performBackup(task)

    console.log(`Task ${taskId} backup completed:`, {
      posts: backupData.weibo.length,
      user: backupData.user.name,
    })

    // 保存备份数据
    await fileSystemManager.saveBackupData(taskId, backupData)

    // 计算下次运行时间
    const now = Date.now()
    const nextRunTime = now + task.interval * 60 * 1000

    // 更新最新微博时间戳
    const latestPostDate
      = backupData.weibo.length > 0
        ? Math.max(
            ...backupData.weibo.map(post =>
              new Date(post.createdAt).getTime(),
            ),
          )
        : task.lastPostDate

    // 更新任务配置
    await storageManager.updateTask(taskId, {
      lastCheck: now,
      nextRunTime,
      totalPosts: backupData.weibo.length, // 使用合并后的总数
      lastPostDate: latestPostDate,
      isFirstBackup: false,
    })

    // 获取配置
    const config = await storageManager.getConfig()

    // 计算新增微博数量
    const previousTotal = task.totalPosts
    const currentTotal = backupData.weibo.length
    const newPostsAdded = Math.max(0, currentTotal - previousTotal)

    let successMessage = ''
    if (task.isFirstBackup) {
      successMessage = config.enableFullBackup
        ? `首次全量备份完成，共获取 ${backupData.weibo.length} 条历史微博`
        : `首次快速备份完成，共获取 ${backupData.weibo.length} 条最近微博`
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

async function performBackup(task: TaskConfig): Promise<BackupData> {
  // 获取用户信息
  const userInfo = await fetchManager.fetchUser(task.uid)

  // 获取配置
  const config = await storageManager.getConfig()

  // 获取现有备份数据以进行去重和增量获取
  const existingData = await storageManager.getBackupData(task.id)
  const latestLocalTime = DataDeduplicator.getLatestPostTime(existingData)

  console.log(`Task ${task.id} backup info:`, {
    username: task.username,
    isFirstBackup: task.isFirstBackup,
    existingPostsCount: existingData?.weibo?.length || 0,
    latestLocalTime:
      latestLocalTime > 0 ? new Date(latestLocalTime).toISOString() : 'none',
  })

  // 获取数据获取策略
  const strategy = DataDeduplicator.getIncrementalFetchStrategy(
    task.isFirstBackup ? 0 : latestLocalTime,
    Date.now(),
  )

  console.log(`Using fetch strategy for task ${task.id}:`, strategy)

  // 配置获取管理器
  fetchManager.config = {
    ...fetchManager.config,
    isFetchAll: strategy.strategy === 'full',
    startAt: strategy.startTime,
    endAt: strategy.endTime,
  }

  await storageManager.updateTaskStatus(task.id, {
    status: 'running',
    message: strategy.description,
    progress: 10,
  })

  // 获取微博数据
  const allPosts: Post[] = []
  const paginationController = new PaginationController()
  let totalFetched = 0
  let newPostsCount = 0
  let duplicateCount = 0

  await fetchManager.fetchAllWeibo({
    uid: task.uid,
    onFetch: async ({ posts: newPosts, page }) => {
      console.log(`Task ${task.id} fetched page ${page}:`, {
        postsCount: newPosts.length,
        totalFetched: totalFetched + newPosts.length,
      })

      // 页面级去重
      const deduplicatedPosts = DataDeduplicator.deduplicateByMblogId(newPosts)
      duplicateCount += newPosts.length - deduplicatedPosts.length

      // 过滤掉已存在的微博（如果有本地数据）
      let filteredPosts = deduplicatedPosts
      if (existingData && existingData.weibo.length > 0) {
        filteredPosts = DataDeduplicator.filterNewPosts(
          deduplicatedPosts,
          existingData.weibo,
        )

        // 智能判断是否需要继续获取
        const shouldContinue = DataDeduplicator.shouldContinueFetching(
          deduplicatedPosts,
          latestLocalTime,
          0.7, // 当70%都是旧数据时停止
        )

        console.log(`Task ${task.id} page ${page} analysis:`, shouldContinue)

        // 检查分页控制器
        const paginationCheck = paginationController.updateAndCheck(
          deduplicatedPosts,
          latestLocalTime,
          0.8,
        )

        console.log(`Task ${task.id} pagination check:`, paginationCheck)

        // 如果需要停止获取，抛出特殊错误来停止循环
        if (!shouldContinue.shouldContinue || !paginationCheck.shouldContinue) {
          console.log(`Task ${task.id} stopping fetch:`, {
            shouldContinueReason: shouldContinue.reason,
            paginationReason: paginationCheck.reason,
          })

          // 这里我们无法直接停止fetchAllWeibo的循环，
          // 但可以记录状态，在后续处理中使用
        }
      }

      allPosts.push(...filteredPosts)
      totalFetched += newPosts.length
      newPostsCount += filteredPosts.length

      // 更新进度
      const progress = Math.min(10 + (totalFetched / 100) * 60, 70) // 微博获取占60%进度
      const message = task.isFirstBackup
        ? `首次备份已获取 ${totalFetched} 条微博，新增 ${newPostsCount} 条...`
        : `增量备份已获取 ${totalFetched} 条微博，新增 ${newPostsCount} 条...`

      await storageManager.updateTaskStatus(task.id, {
        status: 'running',
        message,
        progress,
      })
    },
  })

  // 最终去重处理
  const finalPosts = DataDeduplicator.deduplicateByMblogId(allPosts)

  // 按时间倒序排列
  finalPosts.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime()
    const timeB = new Date(b.createdAt).getTime()
    return timeB - timeA
  })

  // 创建去重报告
  const deduplicationReport = DataDeduplicator.createDeduplicationReport(
    totalFetched,
    finalPosts.length,
    newPostsCount,
  )

  console.log(`Task ${task.id} deduplication report:`, deduplicationReport)

  await storageManager.updateTaskStatus(task.id, {
    status: 'running',
    message: `数据处理完成，去重后获得 ${finalPosts.length} 条微博`,
    progress: 80,
  })

  const backupData: BackupData = {
    user: userInfo,
    weibo: finalPosts,
    followings: [],
    favorites: [],
    lastUpdated: Date.now(),
    version: '1.0.0',
  }

  // 如果有现有数据，进行合并
  if (existingData && existingData.weibo.length > 0) {
    console.log(`Task ${task.id} merging with existing data:`, {
      existingPosts: existingData.weibo.length,
      newPosts: finalPosts.length,
    })

    const mergedData = DataDeduplicator.mergeBackupData(
      existingData,
      backupData,
    )

    console.log(`Task ${task.id} merge result:`, {
      totalPosts: mergedData.weibo.length,
    })

    return mergedData
  }

  return backupData
}

async function getUserInfo(uid: string) {
  return await fetchManager.fetchUser(uid)
}

async function checkCookies(): Promise<{ valid: boolean, uid?: string }> {
  try {
    const uid = await fetchManager.getCurCookieUid()
    return { valid: !!uid, uid }
  }
  catch (_error) {
    return { valid: false }
  }
}

async function getAllStatuses(): Promise<Record<string, TaskStatus>> {
  return await storageManager.getTaskStatuses()
}

async function getTaskStatus(taskId: string): Promise<TaskStatus> {
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

async function updateTaskConfig(taskId: string, config: Partial<TaskConfig>) {
  await taskScheduler.updateTaskSchedule(taskId, config)
}

async function setGlobalConfig(interval: number, autoStart: boolean) {
  await storageManager.saveConfig({ globalInterval: interval, autoStart })

  if (autoStart) {
    // 重新初始化任务调度
    await taskScheduler.initializeTaskSchedules()
    console.log('Global config updated, tasks re-initialized')
  }
  else {
    // 停用所有任务
    const tasks = await storageManager.getTasks()
    for (const task of tasks) {
      if (task.enabled) {
        await taskScheduler.unscheduleTask(task.id)
      }
    }
    console.log('Auto start disabled, all tasks stopped')
  }
}

async function getBackupStats(taskId: string) {
  const meta = await storageManager.getBackupMeta()
  const taskMeta = meta[taskId] || {}
  const tasks = await storageManager.getTasks()
  const task = tasks.find(t => t.id === taskId)

  return {
    totalPosts: task?.totalPosts || 0,
    lastBackup: taskMeta.lastBackup || 0,
    nextBackup: task?.nextRunTime || 0,
  }
}

function setupMessage() {
  onMessage('get-user-info', async ({ data }) => {
    if (!data || typeof data !== 'object' || !('uid' in data)) {
      throw new Error('Invalid data')
    }
    return await getUserInfo((data as any).uid)
  })

  onMessage('start-backup', async ({ data }) => {
    if (!data || typeof data !== 'object' || !('taskId' in data)) {
      throw new Error('Invalid data')
    }
    // 任务添加后自动运行，无需手动启动
    await executeTask((data as any).taskId)
  })

  onMessage('stop-backup', async ({ data }) => {
    if (!data || typeof data !== 'object' || !('taskId' in data)) {
      throw new Error('Invalid data')
    }
    // 停止任务：禁用并清除下次运行时间
    const taskId = (data as any).taskId
    await storageManager.updateTask(taskId, {
      enabled: false,
      nextRunTime: 0,
    })

    await storageManager.updateTaskStatus(taskId, {
      status: 'idle',
      message: '任务已停止',
      progress: 0,
      nextRun: 0,
    })

    console.log(`Task ${taskId} stopped`)
  })

  onMessage('get-task-status', async ({ data }) => {
    if (!data || typeof data !== 'object' || !('taskId' in data)) {
      throw new Error('Invalid data')
    }
    return await getTaskStatus((data as any).taskId)
  })

  onMessage('update-task', async ({ data }) => {
    if (
      !data
      || typeof data !== 'object'
      || !('taskId' in data)
      || !('config' in data)
    ) {
      throw new Error('Invalid data')
    }
    await updateTaskConfig((data as any).taskId, (data as any).config)
  })

  onMessage('get-all-statuses', async () => {
    return await getAllStatuses()
  })

  onMessage('check-cookies', async () => {
    return await checkCookies()
  })

  onMessage('set-global-config', async ({ data }) => {
    if (
      !data
      || typeof data !== 'object'
      || !('interval' in data)
      || !('autoStart' in data)
    ) {
      throw new Error('Invalid data')
    }
    await setGlobalConfig((data as any).interval, (data as any).autoStart)
  })

  onMessage('get-backup-stats', async ({ data }) => {
    if (!data || typeof data !== 'object' || !('taskId' in data)) {
      throw new Error('Invalid data')
    }
    return await getBackupStats((data as any).taskId)
  })

  onMessage('get-scheduler-stats', async () => {
    return taskScheduler.getStats()
  })

  // 添加获取所有备份数据的消息处理
  onMessage('get-all-backup-data', async () => {
    const allBackupData = await handleGetAllBackupData()
    console.log(
      '获取所有备份数据:',
      Object.keys(allBackupData).length,
      '个用户',
    )
    return allBackupData
  })
}

async function handleGetAllBackupData() {
  try {
    const allBackupData = await storageManager.getAllBackupData()
    console.log(
      '获取所有备份数据:',
      Object.keys(allBackupData).length,
      '个用户',
    )
    return allBackupData
  }
  catch (error) {
    console.error('获取所有备份数据失败:', error)
    throw error
  }
}

export default defineBackground(async () => {
  await initialize()

  // 确保扩展关闭时清理资源
  if (typeof globalThis !== 'undefined' && 'addEventListener' in globalThis) {
    globalThis.addEventListener('beforeunload', () => {
      if (taskScheduler) {
        taskScheduler.stop()
      }
    })
  }
})
