import { useDark } from '@vueuse/core'

export const isDark = useDark({
  valueLight: 'light',
  valueDark: 'dark',
  storageKey: 'theme',
  disableTransition: false,
})
