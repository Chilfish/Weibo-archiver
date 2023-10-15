import { defineStore } from 'pinia'
import type { Config } from '../types'

export const useConfigStore = defineStore('config', () => {
  const state = reactive<Config>({
    picLarge: true,
    repostPic: true,
    repost: true,
    comment: true,
    commentCount: 10,
    dateRange: [],
  })

  const setConfig = (config: Partial<Config>) => {
    Object.assign(state, config)
  }

  const isFetchAll = computed(() => state.dateRange.length === 0)

  return {
    state,
    isFetchAll,
    setConfig,
  }
})
