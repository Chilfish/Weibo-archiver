export * from './parse'

export const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true'

export const isInMonkey = document ? document.URL.includes('weibo.com') : false

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}
