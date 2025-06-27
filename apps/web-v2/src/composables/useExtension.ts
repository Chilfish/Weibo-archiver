import { ref } from 'vue'
import { sendMessage } from 'webext-bridge/window'

const isConnected = ref(false)
const timeout = 3000
export function useExtension() {
  async function ping() {
    const messageWithTimeout = new Promise<boolean>((resolve) => {
      const timeoutId = setTimeout(() => resolve(false), timeout)
      sendMessage<boolean>('ping', {})
        .then((result) => {
          clearTimeout(timeoutId)
          resolve(result)
        })
        .catch((e) => {
          console.error(`Error sending message: ${e}`)
          clearTimeout(timeoutId)
          resolve(false)
        })
    })

    isConnected.value = await messageWithTimeout
    console.log('ping', isConnected.value)
  }

  return {
    isConnected,
    ping,
  }
}
