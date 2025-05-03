import { destr } from 'destr'

export * from './dom'
export * from './error'
export * from './export'
export * from './fetch'
export * from './image'
export * from './import'
export * from './message'
export * from './storage'

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
