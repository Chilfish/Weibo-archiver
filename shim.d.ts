import type { UserInfo } from '@weibo-archiver/core'
import type { ProtocolWithReturn } from 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    'fetch:user': ProtocolWithReturn<string, UserInfo>
  }
}
