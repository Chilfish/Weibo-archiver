import type { PicInfo } from './types'

export const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a href="${url}" target="_blank">${text}</a>`

/**
 * 解析正文，例如 @user => link(user, userUrl)
 */
export function parseText(text: string) {
  const url = `${weibo}/n/`
  const reg = /@([^:，\s]+)/g
  return text.replace(reg, (_, user) => link(`@${user}`, url + user))
}

export function parseImg(pic_ids: string[], img_infos: Record<string, PicInfo>) {
  return pic_ids.map(id => img_infos[id].largest.url)
}
