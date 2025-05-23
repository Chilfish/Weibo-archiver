import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { onMessage } from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { FetchManager } from '../modules/fetchWeibo'

export default defineBackground(async () => {
  await main()
  await setupMessage()
})

const curTabId = signal(0)
const fetchManager = new FetchManager({
  ...DEFAULT_FETCH_CONFIG,
  cookie: '',
})

async function main() {
  let cookie = await extensionStorage.getItem('cookies')
  if (!cookie) {
    cookie = await getCookies()
    await extensionStorage.setItem('cookies', cookie)
  }

  fetchManager.setCookie(cookie)
}

async function setupMessage() {
  onMessage('fetch:posts', async ({ data }) => {
    return fetchManager.postService.getPostsBySinceId({
      commentsCount: 5,
      page: 0,
      uid: data as string,
    })
  })

  onMessage('fetch:followings', async ({ data }) => {
    const { uid, page } = (data || {}) as {
      uid: string
      page: number
    }
    if (!uid) {
      return []
    }

    return fetchManager.userService.getFollowings({
      page,
      uid,
    })
  })
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
