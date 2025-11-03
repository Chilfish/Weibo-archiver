import { browser } from 'wxt/browser'
import { StorageManager } from './storageManager'

export async function getCookies(): Promise<string> {
  const cookies = await browser.cookies.getAll({
    domain: '.weibo.com',
  })
  const cookieStr = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';')

  await StorageManager.setItem('cookies', cookieStr)
  return cookieStr
}
