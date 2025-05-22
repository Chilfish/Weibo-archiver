import { message } from '@weibo-archiver/core'

export default defineContentScript({
  matches: [
    // '*://*.google.com/*',
    '*://localhost/*',
    'https://weibo.com/*',
  ],
  async main(ctx) {
    console.log('Hello content.', ctx)

    const ping = await sendMessage('ping', undefined)
    console.log({ ping })

    message.onMessage('fetch:user', async (uid) => {
      const user = await sendMessage('fetchUser', uid)

      message.sendMessage('result:user', user)
    }, window)
  },
})
