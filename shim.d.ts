import type { Post, UserInfo } from '@weibo-archiver/core'
import type { ProtocolWithReturn } from 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    'fetch:user': ProtocolWithReturn<string, UserInfo>
    'fetch:posts': ProtocolWithReturn<{
      uid: string
      newestPostDate: number
    }, Post[]>
  }
}
