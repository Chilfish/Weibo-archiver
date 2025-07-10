import { defineBackground } from 'wxt/utils/define-background'
import { initialize } from '@/lib/background'

export default defineBackground(async () => {
  await initialize()
})
