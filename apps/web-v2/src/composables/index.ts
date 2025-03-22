import { useStorage } from '@vueuse/core'
import { mitt } from '@workspace/shared'

export const config = useStorage('config', {
  theme: 'light',
  imgHost: 'cdn',
  customImageUrl: 'http://localhost:3000/images/',
})

export const emitter = mitt<{
  'open-image-preview': string
}>()
