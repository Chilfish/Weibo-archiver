import { message } from '@weibo-archiver/core'

export default defineContentScript({
  matches: [
    // '*://*.google.com/*',
    '*://localhost/*',
    'https://weibo.com/*',
  ],
  async main() {
    message.onMessage('fetch:user', async (uid) => {
      const user = await sendMessage('fetch:user', uid)
      message.sendMessage('result:user', user)

      return user
    }, window)

    message.onMessage('fetch:posts', async (uid) => {
      const data = await sendMessage('fetch:posts', uid)
      message.sendMessage('result:posts', data)

      return data
    }, window)
  },
})
