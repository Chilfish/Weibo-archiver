import { defineStore } from 'pinia'
import type { FetchOptions } from '@types'

type Config = Omit<FetchOptions, 'cookie'> & {
  isMinimize: boolean
}

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const localData = JSON.parse(localStorage.getItem('fetchOptions') || '{}') as Config

  const state = reactive<Config>({
    uid: '',
    name: '',
    isFetchAll: true,
    picLarge: true,
    repostPic: true,
    repost: true,
    comment: true,
    commentCount: 10,
    dateRange: [now, now],
    isMinimize: false,
    now,
  })

  // 判断 key 是否都相等
  function initConfig() {
    const keys = Object.keys(state)
    const localKeys = Object.keys(localData)
    const isSame = keys.every(key => localKeys.includes(key))

    if (isSame)
      setConfig(localData)
  }

  function setConfig(config: Partial<Config>) {
    Object.assign(state, config)
  }

  watchEffect(() => {
    localStorage.setItem('fetchOptions', JSON.stringify(state))
  })

  return {
    state,
    setConfig,
    initConfig,
  }
})
