import type { UserInfo } from '@weibo-archiver/core'
import { defineExtensionMessaging } from '@webext-core/messaging'

interface ProtocolMap {
  ping: () => boolean
  fetchUser: (uid: string) => Promise<UserInfo>
}

export const { sendMessage, onMessage }
  = defineExtensionMessaging<ProtocolMap>()
