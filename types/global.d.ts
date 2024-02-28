import type { useMessage } from 'naive-ui'
import type { Config, FetchOptions } from './config'

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    config: Config
  }

  interface Global {
    fetchOptions: FetchOptions
  }
}
