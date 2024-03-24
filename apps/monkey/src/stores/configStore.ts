import { defineStore } from 'pinia'
import type { FetchOptions } from '@types'
import { useStorage } from '@vueuse/core'

type Config = FetchOptions & {
  isMinimize: boolean
}

export const useConfigStore = defineStore('config', () => {
  const now = Date.now()
  const KEY = 'weibo-archiver'

  const initConfig: Config = {
    isMinimize: true,
    uid: '',
    name: '',
    since_id: '',
    curPage: 0,
    fetchedCount: 0,
    isFetchAll: true,
    largePic: true,
    repostPic: true,
    hasRepost: true,
    hasComment: true,
    hasFavorite: true,
    commentCount: 6,
    dateRange: [now, now],
  }

  const config = useStorage<Config>(KEY, initConfig, localStorage, { mergeDefaults: true })

  function setConfig(_config: Partial<FetchOptions>) {
    Object.assign(config.value, _config)
  }

  function toggleMinimize() {
    config.value.isMinimize = !config.value.isMinimize
  }

  function init(curUid: string) {
    if (config.value.uid !== curUid) {
      config.value.since_id = ''
      config.value.uid = curUid
      config.value.curPage = 0
    }
  }

  return {
    config,
    setConfig,
    toggleMinimize,
    init,
    reset: () => {
      const { uid, name, isMinimize } = config.value
      config.value = { ...initConfig, uid, name, isMinimize }
    },
  }
})
