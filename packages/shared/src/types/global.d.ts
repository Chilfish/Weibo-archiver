import type { useMessage } from 'naive-ui'
import type { FetchOptions } from './config'

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    fetchOptions: FetchOptions
  }

  namespace NodeJS {
    interface Global {
      fetchOptions: FetchOptions
    }
  }
}
