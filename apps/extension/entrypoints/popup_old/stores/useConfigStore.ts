import type { AppConfig } from '@/types/storage'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface ConfigState {
  config: AppConfig
  isLoading: boolean
  error: string | null
}

interface ConfigActions {
  setConfig: (config: AppConfig) => void
  updateConfig: (updates: Partial<AppConfig>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

type ConfigStore = ConfigState & ConfigActions

const DEFAULT_CONFIG: AppConfig = {
  saveDirectory: 'weibo_backup',
  globalInterval: 30,
  maxRetries: 3,
}

export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    config: DEFAULT_CONFIG,
    isLoading: false,
    error: null,

    // Actions
    setConfig: config => set({ config, error: null }),

    updateConfig: updates =>
      set(state => ({
        config: { ...state.config, ...updates },
        error: null,
      })),

    setLoading: loading => set({ isLoading: loading }),

    setError: error => set({ error }),

    clearError: () => set({ error: null }),
  })),
)

// Selectors
export const useConfigSelector = () => useConfigStore(state => state.config)
export const useConfigLoadingSelector = () =>
  useConfigStore(state => state.isLoading)
export const useConfigErrorSelector = () =>
  useConfigStore(state => state.error)
