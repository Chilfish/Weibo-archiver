import type { FetchOptions } from '@types'

export * from './parse'
export * from './dom'
export * from './protocol'
export * from './fetch'

export const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true'

export const isInMonkey = document ? document.URL.includes('weibo.com') : false

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export function getOptions() {
  const options = typeof localStorage === 'undefined'
    ? (globalThis as any).fetchOptions
    : JSON.parse(localStorage.getItem('fetchOptions') || '{}')

  return options as FetchOptions
}
