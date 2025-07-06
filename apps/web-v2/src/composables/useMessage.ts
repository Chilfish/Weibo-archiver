import type { WindowBackgroundRouter } from '../../../extension/lib/message'
import { createTipcClient } from '@weibo-archiver/core'
import { sendMessage } from 'webext-bridge/window'
import { useAlertDialog } from '@/components/ui/alert-dialog'

export const windowClient = createTipcClient<WindowBackgroundRouter>({
  async sender(key, message) {
    return sendMessageToWxt(
      key,
      message,
      {},
    )
  },
})

export async function sendMessageToWxt<K extends string>(
  key: K,
  args: any,
  fallback: any,
) {
  try {
    return await sendMessage(key, args)
  }
  catch (e: any) {
    console.error(e)
    if (e.name === 'WeiboError') {
      await useAlertDialog().show({
        title: '获取微博数据错误',
        description: `${e.message}`,
      })
    }
    else {
      await useAlertDialog().show({
        title: '与插件通信错误',
        description: `${e.message}`,
      })
    }
    return fallback
  }
}
