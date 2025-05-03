import type { FetchState } from '../types'
import { fetchFollowings, fetchPosts } from '@shared'
import { FetchService, UserService } from '@weibo-archiver/core'
import { computed, reactive } from 'vue'
import { config, useConfig } from './useConfig'
import { usePost } from './usePost'

// 全局状态
const { updateConfig } = useConfig()
const post = usePost()

const fetchService = new FetchService()
export const userService = new UserService(fetchService)

export const fetchState = reactive<FetchState>({
  isStart: false,
  isStop: false,
  isFinish: false,
  isFetchingFollowings: false,
})

export function useFetch() {
  const { pause, start } = fetchPosts({
    fetchOptions: () => ({
      ...config.value,
      uid: config.value.user?.uid || '',
      savePost: newPost => post.addPost(newPost),
    }),
    setTotal: (total) => {
      updateConfig({ total })
    },
    onFinish: async () => {
      if (!config.value.weiboOnly) {
        fetchState.isFetchingFollowings = true
        await fetchFollowings(
          config.value.user?.uid || '',
          async data => post.addFollowingUsers(data),
        )
      }

      fetchState.isStart = false
      fetchState.isFinish = true
      updateConfig({ curPage: config.value.curPage - 1 })
    },
  })

  async function startFetch() {
    fetchState.isStart = true
    fetchState.isFinish = false
    fetchState.isStop = false
    fetchState.isFetchingFollowings = false

    // 如果只获取关注列表
    if (config.value.followingsOnly) {
      fetchState.isFetchingFollowings = true
      await fetchFollowings(
        config.value.user?.uid || '',
        async data => post.addFollowingUsers(data),
      )
      await post.exportFollowingUsers()
      fetchState.isStart = false
      fetchState.isFinish = true
      return
    }

    // 如果是重新开始，不保留上次 fetch 的状态
    if (!config.value.restore)
      await post.resetState()

    await post.updatePostCount()
    await post.updateUserInfo()

    await start()
  }

  function toggleStop() {
    fetchState.isStop = !fetchState.isStop
    if (fetchState.isStop)
      pause()
    else
      start()
  }

  const startButtonText = computed(() => {
    const user = config.value?.user?.name || '【未设置用户】'
    if (config.value.followingsOnly)
      return `获取 ${user} 的关注列表`

    if (fetchState.isStop)
      return `重新开始获取 @${user} 的${config.value.isFetchAll ? '全部' : '部分'}微博`

    return `开始获取 @${user} 的${config.value.isFetchAll ? '全部' : '部分'}微博`
  })

  return {
    state: fetchState,
    startButtonText,
    startFetch,
    toggleStop,
  }
}
