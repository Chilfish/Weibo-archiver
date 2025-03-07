import type { UserConfig } from '../types'
import { useStorage } from '@vueuse/core'
import { toRaw, watch } from 'vue'

const STORAGE_KEY = 'weibo-archiver'

const createInitialConfig = (): UserConfig => ({
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
  commentCount: 5,
  followingsOnly: false,
  weiboOnly: false,
  startAt: Date.now(),
  endAt: Date.now(),
  total: 0,
})

// 全局配置状态
export const config = useStorage<UserConfig>(
  STORAGE_KEY,
  createInitialConfig(),
  localStorage,
  { mergeDefaults: true },
)

export function useConfig() {
  function updateConfig(newConfig: Partial<UserConfig>) {
    Object.assign(config.value, newConfig)
    updateGlobalFetchOptions()
  }

  function updateGlobalFetchOptions() {
    const fetchOptions = toRaw(config.value)
    ;(globalThis as any).fetchOptions = fetchOptions
  }

  function toggleMinimize() {
    config.value.isMinimize = !config.value.isMinimize
  }

  function resetConfig() {
    const { uid, name, isMinimize } = config.value
    config.value = { ...createInitialConfig(), uid, name, isMinimize }
    updateGlobalFetchOptions()
  }

  watch(config, (newConfig) => {
    const { startAt, endAt } = newConfig
    if (startAt && endAt) {
      newConfig.isFetchAll = false
      newConfig.startAt = new Date(startAt).getTime()
      newConfig.endAt = new Date(endAt).getTime()
    }
  }, { immediate: true })

  return {
    config,
    updateConfig,
    toggleMinimize,
    resetConfig,
  }
}
