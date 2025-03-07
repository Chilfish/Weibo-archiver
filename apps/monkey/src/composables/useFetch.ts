import type { FetchState } from '../types'
import { fetchFollowings, fetchPosts } from '@shared'
import { useToast } from '@workspace/ui/shadcn/toast'
import { computed, reactive } from 'vue'
import { config, useConfig } from './useConfig'
import { usePost } from './usePost'

// 全局状态
const toast = useToast()
const { updateConfig } = useConfig()
const post = usePost()

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
      savePost: newPost => post.addPost(newPost),
    }),
    setTotal: (total) => {
      updateConfig({ total })
    },
    onFinish: async () => {
      if (!config.value.weiboOnly) {
        toast.success('获取完毕~，正在获取关注列表')
        fetchState.isFetchingFollowings = true
        await fetchFollowings(
          config.value.uid,
          async data => post.addFollowingUsers(data),
        )
      }

      await post.exportAllData()

      fetchState.isStart = false
      fetchState.isFinish = true
      updateConfig({ curPage: config.value.curPage - 1 })
    },
  })

  async function startFetch() {
    toast.info('开始爬取中，请稍等~')

    fetchState.isStart = true
    fetchState.isFinish = false
    fetchState.isStop = false
    fetchState.isFetchingFollowings = false

    // 如果只获取关注列表
    if (config.value.followingsOnly) {
      fetchState.isFetchingFollowings = true
      await fetchFollowings(
        config.value.uid,
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
    if (config.value.followingsOnly)
      return '获取关注列表'

    if (fetchState.isStop)
      return `重新开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`

    return `开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`
  })

  return {
    state: fetchState,
    startButtonText,
    startFetch,
    toggleStop,
  }
}
