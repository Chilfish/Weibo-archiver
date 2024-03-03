export * from './pagination'

export const isDark = useDark({
  valueLight: 'light',
  valueDark: 'dark',
  storageKey: 'theme',
  disableTransition: false,
})
