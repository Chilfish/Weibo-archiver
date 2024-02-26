import { defineStore } from 'pinia'
import type { FetchOptions } from '@types'

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const localData = localStorage.getItem('fetchOptions')

  const state = reactive<FetchOptions>(localData
    ? JSON.parse(localData)
    : {
        now,
        uid: '',
        name: '',
        cookie: '',
        isFetchAll: true,
        picLarge: true,
        repostPic: true,
        repost: true,
        comment: true,
        commentCount: 10,
        dateRange: [now, now],
      },
  )

  const setConfig = (config: Partial<FetchOptions>) => {
    Object.assign(state, config)
  }

  watchImmediate(() => state.dateRange, (newVal) => {
    state.isFetchAll = newVal.every(v => v === state.now)
  })

  watchEffect(() => {
    localStorage.setItem('fetchOptions', JSON.stringify(state))
  })

  return {
    state,
    setConfig,
  }
})
