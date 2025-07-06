import { TimeoutError } from '@weibo-archiver/core'
import { h } from 'vue'
import { useAlertDialog } from '@/components/ui/alert-dialog'
import { sendMessageToWxt } from '@/composables/useMessage'

export async function pingExtension() {
  const timeout = 1000
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(`请求超时，超过了 ${timeout / 1000} 秒`))
    }, timeout)
  })
  const messagePromise = sendMessageToWxt('ping', {}, null)

  try {
    await Promise.race([messagePromise, timeoutPromise])
  }
  catch (e: any) {
    if (e.name !== 'Timeout') {
      return
    }
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
}
