import type { ImagePreviewEvent } from '../types'
import { useStorage } from '@vueuse/core'
import { mitt } from '@workspace/shared'
import { computed } from 'vue'

export const config = useStorage('config', {
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

const emojiUrl = 'https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal'

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
