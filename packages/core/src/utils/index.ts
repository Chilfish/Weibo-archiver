export * from './parse'
export * from './export'

export const isInMonkey = document.URL.includes('weibo.com')

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}
