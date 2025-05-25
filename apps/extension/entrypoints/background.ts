import type { FetchConfig } from '@weibo-archiver/core'
import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { signal } from 'alien-signals'
import { onMessage, sendMessage } from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/utils/define-background'
import { getCookies } from '../utils/cookie'
import { extensionStorage } from '../utils/storage'
import { FetchManager } from './libs/fetchWeibo'

const matchDomains = [
  'localhost',
  'weibo-archiver.chilfish.top',
]
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
  onMessage<string>('fetch:search-user', async ({ data }) => {
    return fetchManager.searchUser(data)
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

  // @ts-expect-error ok ok
  onMessage<FetchConfig & { uid: string }>('fetch:all-posts', async ({ data }) => {
    fetchManager.config = {
      ...fetchManager.config,
      ...data,
    }

    return fetchManager.fetchAllWeibo({
      uid: data.uid,
      async onFetch(data) {
        await sendMessage('fetch:all-posts-paged', data, {
          tabId: curTabId(),
          context: 'window',
        })
      },
    })
  })

  onMessage<{ uid: string }>('fetch:favorites', async ({ data }) => {
    fetchManager.userService.uid = data.uid
    return fetchManager.fetchFavorites({
      onFetch: async posts => sendMessage('fetch:favorites-paged', posts, {
        tabId: curTabId(),
        context: 'window',
      }),
    })
  })
}

async function onTabLoaded(tabId: number) {
  console.log('tab Reload')
  fetchManager.fetchService.abortFetch(`${tabId} tab reload`)
  await sendMessage('abort-fetch', true, {
    tabId: curTabId(),
    context: 'window',
  })
}

export default defineBackground(async () => {
  await main()
  setupMessage()
  // effect(async () => {
  //   if (tabActiveTime() === 0) {
  //     return
  //   }
  // console.log(tabActiveTime())
  // })

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
        onTabLoaded(tabId)
      }
      curTabId(tabId)
      tabActiveTime(Date.now())
    }
  })

  browser.tabs.onRemoved.addListener(async (tabId) => {
    curTabId(0)
    fetchManager.fetchService.abortFetch(`${tabId} tab close`)
    await sendMessage('abort-fetch', true, {
      tabId: curTabId(),
      context: 'window',
    })
  })
})
