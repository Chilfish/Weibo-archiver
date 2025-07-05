import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

const isDev = process.env.NODE_ENV === 'development'

const root = path.resolve(__dirname, './')
const packages = path.resolve(root, '../../packages')

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': root,
    '@weibo-archiver/core': path.resolve(packages, 'core'),
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: [
      'cookies',
      'storage',
      'activeTab',
      'tabs',
    ],
    name: `Weibo Archiver${isDev ? ' (Dev)' : ''}`,
    description: 'Backup your Weibo posts automatically',
    homepage_url: 'https://weibo-archiver.chilfish.top/',
  },
  zip: {
    name: 'weibo-archiver',
  },
  imports: false,
})
