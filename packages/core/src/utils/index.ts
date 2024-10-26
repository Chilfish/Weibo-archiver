import { destr } from 'destr'

export * from './dom'
export * from './export'
export * from './image'

export const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true'

export const isInMonkey = typeof document !== 'undefined' ? document.URL.includes('weibo.com') : false

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function storage<T>(key: string, defaultVal: T) {
  const str = localStorage.getItem(key)
  if (str === null) {
    localStorage.setItem(key, JSON.stringify(defaultVal))
    return defaultVal
  }
  return destr<T>(str)
}
