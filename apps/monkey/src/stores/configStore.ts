import { defineStore } from 'pinia'
import type { FetchOptions } from '@types'

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const localData = localStorage.getItem('fetchOptions')

  const state = reactive<FetchOptions>(localData
    ? JSON.parse(localData)
    : {
        uid: '',
        name: '',
        cookie: document.cookie,
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

  watch(() => state.dateRange, (newVal) => {
    state.isFetchAll = newVal.every(v => v === now)
  })

  watchEffect(() => {
    localStorage.setItem('fetchOptions', JSON.stringify(state))
  })

  return {
    state,
    setConfig,
  }
})
