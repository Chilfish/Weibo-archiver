import { allowWindowMessaging } from 'webext-bridge/content-script'
import { defineContentScript } from 'wxt/utils/define-content-script'

export default defineContentScript({
  matches: [
    // '*://*.google.com/*',
    '*://localhost/*',
    'https://weibo.com/*',
    'https://weibo-archiver-preview.vercel.app/*',
    'https://weibo-archiver.chilfish.top/*',
  ],
  async main() {
    allowWindowMessaging(window.origin)
  },
})
