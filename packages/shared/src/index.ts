export * from './fetch'
export * from './parse'
export * from './protocol'
export * from './services'
export * from './types'

export const isBrowser = typeof window !== 'undefined'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export function dayStart(date: Date | number) {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}
export function dayEnd(date: Date | number) {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()
}

/**
 * 可暂停/恢复的循环
 * @param fn
 */
export function usePausableLoop(
  fn: () => Promise<{ isFinished: boolean }>,
) {
  let _isPaused = false

  async function startLoop() {
    while (true) {
      if (_isPaused)
        break

      const { isFinished } = await fn()
      if (isFinished)
        break
    }
  }

  function pause() {
    console.log('已暂停')
    _isPaused = true
  }

  async function start() {
    console.log('已恢复')
    _isPaused = false
    await startLoop()
  }

  function isPaused() {
    return _isPaused
  }

  return {
    pause,
    start,
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
