import { signal } from 'alien-signals'
import { configService } from '@/lib/background/configService'
import { executeTask } from '@/lib/background/runTask'
import { setupMessage } from '@/lib/background/setupMessage'
import { backupService } from '@/lib/background/taskService'
import { DEFAULT_FETCH_CONFIG } from '@/lib/constants'
import { getCookies } from '@/lib/cookie'
import { FetchManager } from '@/lib/fetchManager'
import {
  DEFAULT_SCHEDULER_CONFIG,
  TaskScheduler,
} from '@/lib/scheduler/TaskScheduler'
import { extensionStorage, storageManager } from '@/lib/storageManager'

export const fetchManager = new FetchManager({
  ...DEFAULT_FETCH_CONFIG,
  cookie: '',
})

export const taskScheduler = new TaskScheduler(
  DEFAULT_SCHEDULER_CONFIG,
  executeTask,
)

export const curTabId = signal(0)
export const tabActiveTime = signal(0)
export const fetchingTabId = signal(0)

export const matchDomains = ['localhost', 'weibo-archiver.chilfish.top']

export async function initialize() {
  try {
    await initializeCookie()
    setupMessage()
    await initializeTaskScheduler()
  }
  catch (error) {
    console.error('Failed to initialize background manager:', error)
    throw error
  }
}

export async function handleGetAllWeiboData() {
  try {
    const allBackupData = await storageManager.getAllWeiboData()
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

async function initializeCookie() {
  let cookie = await extensionStorage.getItem('cookies')
  if (!cookie?.trim()) {
    cookie = await getCookies()
    await extensionStorage.setItem('cookies', cookie)
  }
  fetchManager.setCookie(cookie)
}

async function initializeTaskScheduler() {
  taskScheduler.start()
  await taskScheduler.initializeTaskSchedules()
}

export { backupService, configService, executeTask, storageManager }
