import { defineExtensionMessaging } from '@webext-core/messaging'

interface ProtocolMap {
  todoData: (data: object) => object
  ping: () => boolean
  fetchData: () => void
}

export const { sendMessage, onMessage }
  = defineExtensionMessaging<ProtocolMap>()
