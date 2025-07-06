import { signal } from 'alien-signals'
import { backupService } from '@/lib/background/backupService'
import { executeTask } from '@/lib/background/runTask'
import { setupMessage } from '@/lib/background/setupMessage'
import { DEFAULT_FETCH_CONFIG } from '@/lib/constants'
import { getCookies } from '@/lib/cookie'
import { FetchManager } from '@/lib/fetchManager'
import { storageManager } from '@/lib/storageManager'
import {
  DEFAULT_SCHEDULER_CONFIG,
  TaskScheduler,
} from './TaskScheduler'

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

async function initializeCookie() {
  let cookie = await storageManager.getCookie()
  if (!cookie?.trim()) {
    cookie = await getCookies()
    await storageManager.setCookie(cookie)
  }
  fetchManager.setCookie(cookie)
}

async function initializeTaskScheduler() {
  taskScheduler.start()
  await taskScheduler.initializeTaskSchedules()
}

export { backupService, executeTask, storageManager }
