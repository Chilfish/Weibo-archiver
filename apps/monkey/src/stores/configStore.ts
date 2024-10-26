import type { FetchOptions } from '@shared'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

type Config = FetchOptions & {
  isMinimize: boolean
  /** 恢复记录 */
  restore: boolean
}

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const KEY = 'weibo-archiver'

  const initConfig: Config = {
    isMinimize: true,
    restore: false,
    uid: '',
    name: '',
    curPage: 0,
    fetchedCount: 0,
    isFetchAll: true,
    largePic: true,
    repostPic: true,
    hasRepost: true,
    hasComment: true,
    hasFavorite: true,
    commentCount: 6,
    followingsOnly: false,
    weiboOnly: false,
    startAt: now,
    endAt: now,
  }

  const config = useStorage<Config>(KEY, initConfig, localStorage, { mergeDefaults: true })

  function setConfig(_config: Partial<FetchOptions>) {
    Object.assign(config.value, _config);
    (globalThis as any).fetchOptions = toRaw(config.value)
  }

  function toggleMinimize() {
    config.value.isMinimize = !config.value.isMinimize
  }

  return {
    config,
    setConfig,
    toggleMinimize,
    reset: () => {
      const { uid, name, isMinimize } = config.value
      config.value = { ...initConfig, uid, name, isMinimize }
    },
  }
})
