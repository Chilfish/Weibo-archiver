import { createTipcHandler } from '@weibo-archiver/core'
import { allowWindowMessaging, onMessage } from 'webext-bridge/content-script'
import { defineContentScript } from 'wxt/utils/define-content-script'
import { background_content_router } from '@/lib/message'

const isDev = process.env.NODE_ENV === 'development'

export default defineContentScript({
  matches: [
    isDev ? '*://localhost/*' : '',
    'https://weibo.com/*',
    'https://weibo-archiver.chilfish.top/*',
    'https://weibo-archiver-preview.vercel.app/*',
  ].filter(Boolean),
  async main() {
    allowWindowMessaging(window.origin)

    createTipcHandler({
      router: background_content_router(),
      receiver: onMessage,
    })
  },
})
