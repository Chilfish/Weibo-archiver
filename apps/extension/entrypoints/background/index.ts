import { createTipcHandler } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { onMessage } from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/utils/define-background'
import {
  popup_background_router,
  window_background_router,
} from '@/lib/message'
import { fetchManager } from './backupService'
import { taskScheduler } from './TaskScheduler'

export {
  fetchManager,
}
export const curTabId = signal(0)

async function initialize() {
  try {
    setupTab()

    createTipcHandler({
      router: window_background_router(),
      receiver: onMessage,
    })
    createTipcHandler({
      router: popup_background_router(),
      receiver: onMessage,
    })

    await taskScheduler.initializeTaskSchedules()
  }
  catch (error) {
    console.error('Failed to initialize background manager:', error)
    throw error
  }
}

function setupTab() {
  const matchDomains = ['localhost', 'weibo-archiver.chilfish.top']

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (
      tab.url && (
        !matchDomains.includes(new URL(tab.url).hostname)
        && !tab.url.includes('weibo-archiver')
      )) {
      return
    }
    if (changeInfo.status === 'complete') {
      curTabId(tabId)
    }
  })
}

export default defineBackground(async () => {
  await initialize()
})
