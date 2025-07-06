import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/utils/define-background'
import {
  curTabId,
  initialize,
  matchDomains,
  tabActiveTime,
  taskScheduler,
} from '@/lib/background'

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

  browser.tabs.onActivated.addListener(({ tabId }) => {
    curTabId(tabId)
  })

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      tab.url && (
        !matchDomains.includes(new URL(tab.url).hostname)
        && !tab.url.includes('weibo-archiver')
      )) {
      return
    }
    if (changeInfo.status === 'complete') {
      if (tabId === curTabId()) {
        // onTabLoaded(tabId)
      }
      curTabId(tabId)
      tabActiveTime(Date.now())
    }
  })
})
