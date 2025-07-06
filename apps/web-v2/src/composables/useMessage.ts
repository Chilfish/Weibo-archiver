import type { WindowBackgroundRouter } from '../../../extension/lib/message'
import { createTipcClient } from '@weibo-archiver/core'
import { h } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import { useAlertDialog } from '@/components/ui/alert-dialog'

export const windowClient = createTipcClient<WindowBackgroundRouter>({
  async sender(key, message) {
    return sendMessageToWxt(
      key,
      message,
      {},
      5000,
    )
  },
})

class TimeoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Timeout'
  }
}

export async function sendMessageToWxt<K extends string>(
  key: K,
  args: any,
  fallback: any,
  timeout: number = 3000,
) {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(`请求 '${String(key)}' 超时，超过了 ${timeout / 1000} 秒`))
    }, timeout)
  })

  const operationPromise = sendMessage(key, args)

  try {
    return await Promise.race([
      operationPromise,
      timeoutPromise,
    ])
  }
  catch (e: any) {
    console.error(e)
    if (e.name === 'Timeout') {
      await useAlertDialog().show({
        title: '未安装浏览器插件',
        description: h(
          'div',
          [
            '为确保备份同步的正常运行，请先参考 ',
            h(
              'a',
              {
                href: 'https://weibo-archiver.chilfish.top/docs/extension.html',
                target: '_blank',
                class: 'font-medium text-primary underline underline-offset-2',
              },
              '文档',
            ),
            ' 安装浏览器插件。不过您仍可以查看已保存的微博数据。',
          ],
        ),
        confirmText: '好的',
        cancelText: '明白',
        onConfirm() {
          window.open('https://weibo-archiver.chilfish.top/docs/extension.html', '_blank')
        },
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
