import { defineStore } from 'pinia'
import type { FetchOptions } from '@types'

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const KEY_MINIMIZE = 'archiver-isMinimize'

  const isMinimize = ref(localStorage.getItem(KEY_MINIMIZE) === 'true')

  const state = reactive<FetchOptions>({
    uid: '',
    name: '',
    isFetchAll: true,
    largePic: true,
    repostPic: true,
    hasRepost: true,
    hasComment: true,
    hasFavorite: true,
    commentCount: 6,
    dateRange: [now, now],
  })

  function setConfig(config: Partial<FetchOptions>) {
    Object.assign(state, config)
  }

  function toggleMinimize() {
    isMinimize.value = !isMinimize.value
    localStorage.setItem(KEY_MINIMIZE, isMinimize.value.toString())
  }

  return {
    state,
    isMinimize,
    setConfig,
    toggleMinimize,
  }
})
