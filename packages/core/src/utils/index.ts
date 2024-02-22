import type { FetchOptions } from '@types'

export * from './parse'
export * from './dom'
export * from './protocol'
export * from './fetch'

export const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true'

export const isInMonkey = typeof document !== 'undefined' ? document.URL.includes('weibo.com') : false

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export async function getOptions() {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('fetchOptions') || '{}') as FetchOptions
  }
  else {
    const { config } = await import('./config')
    return config.store.fetchOptions
  }
}
