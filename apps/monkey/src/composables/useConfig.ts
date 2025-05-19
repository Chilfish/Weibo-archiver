import type { UserConfig } from '@weibo-archiver/core'
import { useStorage } from '@vueuse/core'
import { DEFAULT_USER_CONFIG } from '@weibo-archiver/core'
import { watch } from 'vue'

const STORAGE_KEY = 'weibo-archiver'

const createInitialConfig = (): UserConfig => (DEFAULT_USER_CONFIG)

// 全局配置状态
export const config = useStorage<UserConfig>(
  STORAGE_KEY,
  createInitialConfig(),
  localStorage,
  { mergeDefaults: true },
)

export function useConfig() {
  function updateConfig(newConfig: Partial<UserConfig>) {
    config.value = {
      ...config.value,
      ...newConfig,
    }
  }

  function toggleMinimize() {
    config.value.isMinimize = !config.value.isMinimize
  }

  function resetConfig() {
    const { user, isMinimize } = config.value
    config.value = { ...createInitialConfig(), user, isMinimize }
  }

  watch(config, (newConfig) => {
    const { startAt, endAt } = newConfig
    if (startAt && endAt) {
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
