export * from './fetch'

export const isDark = useDark({
  initialValue: 'light',
  valueLight: 'light',
  valueDark: 'dark',
  storageKey: 'theme',
  disableTransition: false,
})
