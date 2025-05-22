import type { ProtocolMap } from '@weibo-archiver/core'
import { defineExtensionMessaging } from '@webext-core/messaging'

export const { sendMessage, onMessage }
  = defineExtensionMessaging<ProtocolMap>()
