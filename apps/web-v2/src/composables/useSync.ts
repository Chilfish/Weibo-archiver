import type { Favorite, FetchConfig, Post } from '@weibo-archiver/core'
import { ref } from 'vue'
import { onMessage } from 'webext-bridge/window'
import { sendingMessage } from '@/composables/useMessage'

export function useSyncBookmarks() {
  const onFetch = ref<(data: Favorite[]) => any>(() => {
  })

  async function start(uid: string) {
    return await sendingMessage.fetchFavorites({
      uid,
    })
  }

  onMessage<Favorite[]>('fetch:favorites-paged', async ({ data }) => {
    await onFetch.value(data)
  })

  return {
    start,
    onFetch,
  }
}

export function useSyncPosts() {
  interface SyncData {
    posts: Post[]
    page: number
    sinceId: string
  }

  const onFetch = ref<(data: SyncData) => any>(() => {
  })

  async function start(fetchConfig: FetchConfig, uid: string) {
    return await sendingMessage.fetchAllPosts({
      ...fetchConfig,
      uid,
    })
  }

  onMessage('fetch:all-posts-paged', async ({ data }) => {
    await onFetch.value(data as any)
  })

  return {
    start,
    onFetch,
  }
}
