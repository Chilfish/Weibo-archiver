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

declare const __COMMIT_DATE__: string
declare const __COMMIT_HASH__: string
declare const __LAST_COMMIT_MESSAGE__: string
declare const __COMMIT_URL__: string
declare const __VERSION__: string
