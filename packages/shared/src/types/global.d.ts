import type { useMessage } from 'naive-ui'
import type { FetchOptions } from './config'

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    fetchOptions: FetchOptions

    readonly __COMMIT_DATE__: string
    readonly __COMMIT_HASH__: string
    readonly __LAST_COMMIT_MESSAGE__: string
    readonly __COMMIT_URL__: string
    readonly __VERSION__: string
  }

  namespace NodeJS {
    interface Global {
      fetchOptions: FetchOptions
    }
  }
}
