import { browser } from 'wxt/browser'

export async function getCookies(): Promise<string> {
  const cookies = await browser.cookies.getAll({
    domain: '.weibo.com',
  })
  return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';')
}
