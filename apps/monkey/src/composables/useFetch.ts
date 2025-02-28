import type { FetchState } from '../types'
import { fetchFollowings, fetchPosts } from '@shared'
import { useToast } from '@workspace/ui/shadcn/toast'
import { storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'
import { useConfigStore, usePostStore } from '../stores'

export function useFetch() {
  const toast = useToast()
  const postStore = usePostStore()
  const configStore = useConfigStore()
  const { config } = storeToRefs(configStore)

  const state = reactive<FetchState>({
    isStart: false,
    isStop: false,
    isFinish: false,
    isFetchingFollowings: false,
  })

  const { pause, start } = fetchPosts({
    fetchOptions: () => ({
      ...config.value,
      savePost: post => postStore.addPost(post),
    }),
    setTotal: total => postStore.state.total = total,
    onFinish: async () => {
      if (!config.value.weiboOnly) {
        toast.success('获取完毕~，正在获取关注列表')
        state.isFetchingFollowings = true
        await fetchFollowings(
          config.value.uid,
          async data => postStore.addFollowingUsers(data),
        )
      }

      await postStore.exportAllData()

      state.isStart = false
      state.isFinish = true
      configStore.updateConfig({ curPage: config.value.curPage - 1 })
    },
  })

  async function startFetch() {
    toast.info('开始爬取中，请稍等~')
    console.log('config', config.value)

    await postStore.initializeDB()

    state.isStart = true
    state.isFinish = false
    state.isStop = false
    state.isFetchingFollowings = false

    // 如果只获取关注列表
    if (config.value.followingsOnly) {
      state.isFetchingFollowings = true
      await fetchFollowings(
        config.value.uid,
        async data => postStore.addFollowingUsers(data),
      )
      await postStore.exportFollowingUsers()
      state.isStart = false
      state.isFinish = true
      return
    }

    // 如果是重新开始，不保留上次 fetch 的状态
    if (!config.value.restore || !config.value.isFetchAll)
      await postStore.resetState()

    await postStore.updatePostCount()
    await postStore.updateUserInfo()

    await start()
  }

  function toggleStop() {
    state.isStop = !state.isStop
    if (state.isStop)
      pause()
    else
      start()
  }

  const startButtonText = computed(() => {
    if (config.value.followingsOnly)
      return '获取关注列表'

    if (state.isStop)
      return `重新开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`

    return `开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`
  })

  return {
    state,
    startButtonText,
    startFetch,
    toggleStop,
  }
}
