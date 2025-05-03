export * from './error'
export * from './fetch'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms
  return new Promise(resolve => setTimeout(resolve, randomMs))
}
