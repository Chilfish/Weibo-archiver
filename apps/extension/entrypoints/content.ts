import { createTipcHandler } from '@weibo-archiver/core'
import {
  allowWindowMessaging,
  onMessage,
} from 'webext-bridge/content-script'
import { defineContentScript } from 'wxt/utils/define-content-script'
import { background_content_router } from '@/lib/message'

export default defineContentScript({
  matches: [
    '*://localhost/*',
    'https://weibo.com/*',
    'https://weibo-archiver.chilfish.top/*',
    'https://weibo-archiver-preivew.vercel.app/*',
  ],
  async main() {
    createTipcHandler({
      router: background_content_router(),
      receiver: onMessage,
    })

    console.log('微博自动备份 Content Script 已加载')

    allowWindowMessaging(window.origin)
  },
})
