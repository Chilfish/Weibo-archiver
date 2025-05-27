import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Weibo Archiver - 备份你的微博',
    permissions: ['cookies', 'storage'],
  },
  imports: false,
})
