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

  const useCdn = storage<boolean>('useCdn', false)

  if (useCdn) {
    const { pathname } = new URL(img)
    return `https://cdn.ipfsscan.io/weibo${pathname}`
  }

  const name = img.split('/').pop()?.replace(/\?.+/, '') // 同时去除 params
  const prefix = img.match(/^(?:https?:\/\/)?([^:\/\n]+)/im)?.[1] // 域名

  if (!prefix || !name)
    return img
  return `/assets/img/${prefix}-${name}`
}
