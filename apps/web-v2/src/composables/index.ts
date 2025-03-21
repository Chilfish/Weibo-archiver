import { useStorage } from '@vueuse/core'

export const config = useStorage('config', {
  theme: 'light',
  imgHost: 'cdn',
  customImageUrl: 'http://localhost:3000/images/',
})
