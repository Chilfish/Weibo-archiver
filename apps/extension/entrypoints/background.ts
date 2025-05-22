import { signal } from 'alien-signals'
import { browser } from 'wxt/browser'

export default defineBackground(async () => {
  await main()
})

const curTabId = signal(0)

async function main() {
  onMessage('ping', () => true)
  console.log('Hello background!', { id: browser.runtime.id })
}

async function onTabLoaded() {
  const cookies = await getCookies()
  console.log(cookies)
}

browser.tabs.onActivated.addListener(({ tabId }) => {
  curTabId(tabId)
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    curTabId(tabId)
    await onTabLoaded()
  }
})
