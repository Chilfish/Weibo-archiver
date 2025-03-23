import type { AppConfig, ImagePreviewEvent } from '../types'
import { useStorage } from '@vueuse/core'
import { emojiUrl, imgCdn, localImgHost, proxyImgHost } from '@workspace/core'
import { mitt } from '@workspace/shared'
import { computed } from 'vue'

export const config = useStorage<AppConfig>('config', {
  theme: 'light',
  imgHost: 'cdn',
  customImageUrl: 'http://localhost:3000/images/',
})

export const emitter = mitt<{
  'open-image-preview': ImagePreviewEvent
}>()

interface Emoji {
  phrase: string[]
  path: string
}

export function useEmoji() {
  const emojis = useStorage<Emoji[]>('weibo-emojis', [])
  const emojiPhrases = computed(() => emojis.value.map(emoji => emoji.phrase).flat())

  function getEmoji(phrase: string) {
    return emojis.value.find(emoji => emoji.phrase.includes(phrase))
  }

  function getEmojiUrl(phrase: string) {
    const emoji = getEmoji(phrase)
    return emoji ? `${emojiUrl}${emoji.path}` : ''
  }

  async function fetchEmojis() {
    if (emojis.value.length)
      return

    fetch(`/emoji.json`)
      .then(res => res.json())
      .then(data => emojis.value = data)
  }

  return {
    emojiPhrases,
    getEmoji,
    getEmojiUrl,
    fetchEmojis,
  }
}

/**
 * 将图片的远程 url 替换为本地图片
 * 格式：域名-文件名
 */
export function replaceImg(src: string, forceCdn = false) {
  const { imgHost, customImageUrl } = config.value

  if (
    src.includes('data:image') // base64
    || src.startsWith(imgCdn) // 使用 ipfs cdn
    || imgHost === 'original' // 使用微博官方链接
  ) {
    return src
  }

  // 头像就直接用 cdn 的了
  if (src.includes('sinaimg.cn/crop')) {
    const { pathname, origin } = new URL(src)
    return `${imgCdn}/${origin}${pathname}`
  }

  // 使用 ipfs cdn
  if (imgHost === 'cdn' || forceCdn) {
    if (src.includes('sinaimg.cn')) {
      const { pathname } = new URL(src)
      return `${imgCdn}${pathname}`
    }
    if (src.includes('hdslb.com')) {
      return `${proxyImgHost}${src}`
    }
    // 像是 网易云这种外链的图片，就保持原样
    return src
  }

  const name = src.split('/').pop()?.replace(/\?.+/, '') // 同时去除 params
  const prefix = src.match(/^(?:https?:\/\/)?([^:/\n]+)/im)?.[1] // 域名

  if (!prefix || !name)
    return src
  const fileName = `${prefix}-${name}`

  // 本地图片
  if (imgHost === 'local') {
    return `${localImgHost}/${fileName}`
  }

  // 自建图床
  if (imgHost === 'custom') {
    try {
      const url = new URL(customImageUrl)
      url.pathname = fileName
      return url.toString()
    }
    catch (error) {
      console.error(error)
      return `${localImgHost}/${fileName}`
    }
  }

  return src
}
