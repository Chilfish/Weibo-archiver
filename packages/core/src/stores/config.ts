import { defineStore } from 'pinia'
import type { Config } from '../types'

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()

  const state = reactive<Config>({
    picLarge: true,
    repostPic: true,
    repost: true,
    comment: true,
    commentCount: 10,
    dateRange: [now, now],
  })

  const setConfig = (config: Partial<Config>) => {
    Object.assign(state, config)
  }

  const isFetchAll = computed(() => state.dateRange.every(v => v === now))

  return {
    state,
    isFetchAll,
    setConfig,
  }
})
