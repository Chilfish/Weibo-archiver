import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/utils/define-background'
import {
  curTabId,
  initialize,
  matchDomains,
  tabActiveTime,
  taskScheduler,
} from '@/lib/background'

async function onTabLoaded(tabId: number) {
}

export default defineBackground(async () => {
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
      tabActiveTime(Date.now())
      await onTabLoaded(tabId)
    }
  })

  await initialize()
})
