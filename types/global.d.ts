declare global {
  import type { useMessage } from 'naive-ui'
  import type { FetchOptions } from './config'
  import type { db } from '#preload'

  interface Window {
    $message: ReturnType<typeof useMessage>
    db: ReturnType<typeof db>
  }

  interface Global {
    fetchOptions: FetchOptions
  }
}
