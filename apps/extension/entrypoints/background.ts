import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { onMessage, sendMessage } from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/utils/define-background'
import { getCookies } from '../utils/cookie'
import { extensionStorage } from '../utils/storage'
import { FetchManager } from './libs/fetchWeibo'

const curTabId = signal(0)
const tabActiveTime = signal(0)
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

  const curUid = await fetchManager.getCurCookieUid()
  await extensionStorage.setItem('curUid', curUid)
}

function setupMessage() {
  onMessage<string>('fetch:posts', async ({ data }) => {
    return fetchManager.postService.getPostsBySinceId({
      commentsCount: 5,
      page: 0,
      uid: data,
    })
  })

  onMessage<{ uid: string }>('fetch:followings', async ({ data }) => {
    const { uid } = (data || {})
    if (!uid) {
      return []
    }

    return fetchManager.fetchFollowings(uid)
  })

  onMessage<{
    uid: string
    newestPostDate: number
  }>('fetch:posts', async ({ data }) => {
    const { uid, newestPostDate } = (data || {})

    if (!uid) {
      return []
    }

    return fetchManager.fetchNewPosts({
      uid,
      newestPostDate,
      async onFetch(count) {
        await sendMessage('state:fetch-count', count, {
          tabId: curTabId(),
          context: 'window',
        })
      },
    })
  })
}

function onTabLoaded() {
}

browser.tabs.onActivated.addListener(({ tabId }) => {
  curTabId(tabId)
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    curTabId(tabId)
    tabActiveTime(Date.now())
    onTabLoaded()
  }
})

export default defineBackground(async () => {
  await main()
  setupMessage()
  // effect(async () => {
  //   if (tabActiveTime() === 0) {
  //     return
  //   }
  // console.log(tabActiveTime())
  // })
})
