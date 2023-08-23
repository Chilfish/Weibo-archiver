import { createFetch } from '@vueuse/core'

export const weiFetch = createFetch({
  baseUrl: 'https://weibo.com/ajax/statuses',
  combination: 'overwrite',
  options: {
    immediate: false,
    timeout: 1000,
  },
})
