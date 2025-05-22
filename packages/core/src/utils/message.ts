import type { Post, UserInfo } from '../types'

export function createWindowMessage<T extends Record<string, (...args: any[]) => any>>() {
  const handlers = new Map<keyof T, T[keyof T]>()

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== window.origin || typeof event.data !== 'object' || event.data === null) {
      return
    }
    const { type, data } = event.data
    if (handlers.has(type)) {
      const handler = handlers.get(type)!
      handler(data)
    }
  }

  return {
    sendMessage<K extends keyof T>(type: K, data: Parameters<T[K]>[0]) {
      window.postMessage({
        type,
        data,
      }, window.origin)
    },

    onMessage<K extends keyof T>(type: K, handler: T[K], windows = window) {
      handlers.set(type, handler)
      windows.addEventListener('message', handleMessage)
    },
  }
}

export interface ProtocolMap {
  'fetch:user': (uid: string) => Promise<UserInfo>
  'result:user': (user: UserInfo) => void

  'fetch:posts': (uid: string) => any
  'result:posts': (posts: Post[]) => any

  [key: string]: (...args: any[]) => any
}

export const message = createWindowMessage<ProtocolMap>()
