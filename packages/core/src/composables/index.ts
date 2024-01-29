export * from './fetch'
export * from './pagination'

export const isDark = useDark({
  initialValue: 'light',
  valueLight: 'light',
  valueDark: 'dark',
  storageKey: 'theme',
  disableTransition: false,
})
