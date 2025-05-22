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

    ctx.addEventListener(window, 'message', async ({ data }) => {
      if (!data.type?.startsWith('fetch:')) {
        return
      }

      if (data.type === 'fetch:user') {
        const user = await sendMessage('fetchUser', data.data.uid)

        window.postMessage({
          type: 'result:user',
          data: user,
        }, window.origin)
      }
    })
  },
})
