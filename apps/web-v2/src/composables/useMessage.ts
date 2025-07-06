import type { FetchConfig, Following, UserInfo } from '@weibo-archiver/core'
import { h } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import { useAlertDialog } from '@/components/ui/alert-dialog'

interface Message {
  'fetch:followings': {
    args: {
      uid: string
    }
    return: Following[]
  }
  'fetch:favorites': {
    args: {
      uid: string
    }
    return: any
  }
  'fetch:all-posts': {
    args: {
      uid: string
    } & FetchConfig
    return: any
  }
  'fetch:search-user': {
    args: {
      searchText: string
    }
    return: UserInfo[]
  }
  'ping': {
    args: any
    return: boolean
  }
}

class TimeoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Timeout'
  }
}

export async function sendMessageToWxt<K extends keyof Message>(
  key: K,
  args: Message[K]['args'],
  fallback: Message[K]['return'],
) {
  const timeout = 3000

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(`请求 '${String(key)}' 超时，超过了 ${timeout / 1000} 秒`))
    }, timeout)
  })

  const operationPromise = sendMessage<Message[K]['return']>(key, args)

  try {
    return await Promise.race([
      operationPromise,
      timeoutPromise,
    ])
  }
  catch (e: any) {
    console.log(e)
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
            ' 安装浏览器插件。',
          ],
        ),
        confirmText: '好的',
        cancelText: '明白',
      })
    }
    else {
      await useAlertDialog().show({
        title: '与插件通信错误',
        description: `${e.message}`,
      })
      console.error(e)
    }
    return fallback
  }
}

export const sendingMessage = {
  async fetchFollowings(args: Message['fetch:followings']['args']) {
    return sendMessageToWxt('fetch:followings', args, [])
  },
  async fetchFavorites(args: Message['fetch:favorites']['args']) {
    return sendMessageToWxt('fetch:favorites', args, [])
  },
  async fetchAllPosts(args: Message['fetch:all-posts']['args']) {
    return sendMessageToWxt('fetch:all-posts', args, [])
  },
  async searchUser(args: Message['fetch:search-user']['args']) {
    return sendMessageToWxt('fetch:search-user', args, [])
  },

  async ping(args: Message['ping']['args']) {
    return sendMessageToWxt('ping', args, false)
  },
}
