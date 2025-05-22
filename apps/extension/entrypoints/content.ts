import type { ContentScriptContext } from 'wxt/utils/content-script-context'

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

    if (document.location.hostname === 'weibo.com') {
      return await weiboContent(ctx)
    }
  },
})

async function weiboContent(ctx: ContentScriptContext) {
  const cookies = browser.cookies

  console.log({ cookies })
}
