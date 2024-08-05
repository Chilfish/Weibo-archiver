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
 * Format the date string
 * @param time the date string
 * @param fmt the format string, e.g. `YYYY-MM-DD HH:mm:ss`
 */
export function formatDate(
  time: string | number | Date,
  fmt = 'YYYY-MM-DD HH:mm:ss',
) {
  if (typeof time === 'number' && time < 1e12)
    time *= 1000

  const date = new Date(time)
  if (Number.isNaN(date.getTime()))
    return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Months are zero-based
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return fmt
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
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
