import {
  NAlert,
  NCheckbox,
  NConfigProvider,
  NDatePicker,
  NInputNumber,
  NMessageProvider,
  NProgress,
  create,
  useMessage,
} from 'naive-ui'

/**
 * 由于油猴的打包很多限制，还是只能手动全局引入了，而不能使用 auto-import
 */
export const naive = create({
  components: [
    useMessage,
    NAlert,
    NCheckbox,
    NConfigProvider,
    NDatePicker,
    NInputNumber,
    NMessageProvider,
    NProgress,
  ],
})
