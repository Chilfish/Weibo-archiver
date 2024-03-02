import { imgCdn, imgViewSrc } from '../constants'
import { storage } from './index'

/**
 * 将图片的远程 url 替换为本地图片
 * 格式：域名-文件名
 */
export function replaceImg(img: string) {
  if (!img)
    return imgViewSrc

  if (img.includes('data:image') || img.startsWith(imgCdn))
    return img

  const imgHost = storage<string>('imgHost', '/')

  if (imgHost === imgCdn) {
    const { pathname } = new URL(img)
    return `${imgCdn}${pathname}`
  }

  const name = img.split('/').pop()?.replace(/\?.+/, '') // 同时去除 params
  const prefix = img.match(/^(?:https?:\/\/)?([^:\/\n]+)/im)?.[1] // 域名

  if (!prefix || !name)
    return img
  const fileName = `${prefix}-${name}`

  if (imgHost === '/')
    return `http://localhost:3000/${fileName}`

  const fixedBase = imgHost.endsWith('/') ? imgHost : `${imgHost}/`
  return `${fixedBase}${fileName}`
}
