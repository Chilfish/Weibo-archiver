import { messageWithVue } from '@weibo-archiver/core'
import { sendMessage } from '../utils/message'

export default defineContentScript({
  matches: [
    // '*://*.google.com/*',
    '*://localhost/*',
    'https://weibo.com/*',
  ],
  async main() {
    messageWithVue.onMessage('fetch:user', async (uid) => {
      const user = await sendMessage('fetch:user', uid)
      messageWithVue.sendMessage('result:user', user)

      return user
    }, window)

    messageWithVue.onMessage('fetch:posts', async (uid) => {
      const data = await sendMessage('fetch:posts', uid)
      messageWithVue.sendMessage('result:posts', data)

      return data
    }, window)

    messageWithVue.onMessage('fetch:followings', async (uid) => {
      return sendMessage('fetch:followings', uid)
    })
  },
})
