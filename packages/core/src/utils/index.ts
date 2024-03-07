import { destr } from 'destr'
import type { FetchOptions } from '@types'

export * from './parse'
export * from './dom'
export * from './protocol'
export * from './fetch'
export * from './image'
export * from './export'

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

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export async function getOptions() {
  if (!isElectron) {
    return JSON.parse(localStorage.getItem('fetchOptions') || '{}') as FetchOptions
  }
  // TODO: 在构建 monkey 时，注释下面几行
  else {
    const { config } = await import('./config')
    return config.store.fetchOptions
  }
}

/**
 * 可暂停/恢复的循环
 * @param fn
 */
export function usePausableLoop(
  fn: () => Promise<{ isStop: boolean }>,
) {
  let _isPaused = false

  async function startLoop() {
    while (true) {
      if (_isPaused)
        break

      const { isStop } = await fn()
      if (isStop)
        break
    }
  }

  function pause() {
    console.log('已暂停')
    _isPaused = true
  }

  async function resume() {
    console.log('已恢复')
    _isPaused = false
    await startLoop()
  }

  function isPaused() {
    return _isPaused
  }

  return {
    startLoop,
    pause,
    resume,
    isPaused,
  }
}

/**
 * 等待值不为空
 */
export async function waitNotNull<T>(
  value: T | null | undefined,
) {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (value === null || value === undefined)
    await new Promise(resolve => setTimeout(resolve, 500))

  return value
}
