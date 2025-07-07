import { createTipcHandler } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { onMessage } from 'webext-bridge/background'
import { backupService } from '@/lib/background/backupService'
import { executeTask } from '@/lib/background/runTask'
import { DEFAULT_FETCH_CONFIG } from '@/lib/constants'
import { getCookies } from '@/lib/cookie'
import { FetchManager } from '@/lib/fetchManager'
import {
  popup_background_router,
  window_background_router,
} from '@/lib/message'
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
    // await initializeCookie()

    createTipcHandler({
      router: popup_background_router(),
      receiver: onMessage,
    })
    createTipcHandler({
      router: window_background_router(),
      receiver: onMessage,
    })
    await initializeTaskScheduler()
  }
  catch (error) {
    console.error('Failed to initialize background manager:', error)
    throw error
  }
}

async function initializeCookie() {
  const cookie = await getCookies()
  await storageManager.setCookie(cookie)
  fetchManager.setCookie(cookie)
}

async function initializeTaskScheduler() {
  taskScheduler.start()
  await taskScheduler.initializeTaskSchedules()
}

export { backupService, executeTask, storageManager }
