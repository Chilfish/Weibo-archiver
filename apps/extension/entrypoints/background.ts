import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { browser } from 'wxt/browser'
import { FetchManager } from '../modules/fetchWeibo'

export default defineBackground(async () => {
  await main()
})

const curTabId = signal(0)
const fetchManager = new FetchManager({
  ...DEFAULT_FETCH_CONFIG,
  cookie: '',
})

async function main() {
  onMessage('ping', () => true)
  console.log('Hello background!', { id: browser.runtime.id })

  let cookie = await extensionStorage.getItem('cookies')
  if (!cookie) {
    cookie = await getCookies()
    await extensionStorage.setItem('cookies', cookie)
  }

  fetchManager.setCookie(cookie)

  await fetchManager.fetchUser('5734325998')
}

async function onTabLoaded() {
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
