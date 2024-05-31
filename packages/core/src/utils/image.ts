import { imgCdn, imgViewSrc } from '../constants'
import { storage } from './index'

/**
 * 将图片的远程 url 替换为本地图片
 * 格式：域名-文件名
 */
export function replaceImg(img: string, forceCdn = false) {
  if (!img)
    return imgViewSrc

  const imgHost = storage<string>('imgHost', '/')

  if (
    img.includes('data:image') // base64
    || img.startsWith(imgCdn) // 使用 ipfs cdn
    || imgHost === 'weibo'// 使用微博官方链接
  ) {
    return img
  }

  // 使用 ipfs cdn
  if (imgHost === imgCdn || forceCdn) {
    if (img.includes('sinaimg.cn')) {
      const { pathname } = new URL(img)
      return `${imgCdn}${pathname}`
    }
    // 像是 b 站、网易云这种外链的图片，就保持原样
    return img
  }

  const name = img.split('/').pop()?.replace(/\?.+/, '') // 同时去除 params
  const prefix = img.match(/^(?:https?:\/\/)?([^:/\n]+)/im)?.[1] // 域名

  if (!prefix || !name)
    return img
  const fileName = `${prefix}-${name}`

  // 本地图片
  if (imgHost === '/')
    return `http://localhost:3000/${fileName}`

  // 自建图床
  const fixedBase = imgHost.endsWith('/') ? imgHost : `${imgHost}/`
  return `${fixedBase}${fileName}`
}
