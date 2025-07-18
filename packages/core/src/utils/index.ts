export * from './dom'
export * from './emitter'
export * from './error'
export * from './fetch'
export * from './format'
export * from './IndexedDB'
export * from './pqueue'
export * from './tipc'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms
  return new Promise(resolve => setTimeout(resolve, randomMs))
}
