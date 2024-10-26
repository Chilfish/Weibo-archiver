import {
  create,
  NAlert,
  NCheckbox,
  NConfigProvider,
  NDatePicker,
  NInputNumber,
  NMessageProvider,
  NProgress,
  NTooltip,
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
    NTooltip,
    NProgress,
  ],
})
