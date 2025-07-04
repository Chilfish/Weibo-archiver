import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

const isDev = process.env.NODE_ENV === 'development'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': path.resolve(__dirname, './'),
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: [
      'cookies',
      'storage',
      'notifications',
      'activeTab',
      'tabs',
      'alarms',
    ],
    name: `Weibo Archiver${isDev ? ' (Dev)' : ''}`,
    description: 'Backup your Weibo posts automatically',
  },
  imports: false,
})
