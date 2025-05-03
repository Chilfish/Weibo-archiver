import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import { version } from './package.json'

export const root = path.resolve(__dirname, '../../')
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')

const repo = 'https://github.com/Chilfish/Weibo-archiver'
const downloadURL = `${repo}/raw/monkey/weibo-archiver.user.js`
const updateURL = downloadURL.replace('user', 'meta')

export default defineConfig({
  resolve: {
    alias: {
      '@core': core,
      '@weibo-archiver/core-v1': `${packages}/core`,
      '@weibo-archiver/core': `${packages}/core-v2`,
      '@weibo-archiver/ui': `${packages}/ui/`,
      '@weibo-archiver/shared': `${packages}/shared/`,
    },
  },
  build: {
    minify: true,
    outDir: path.join(root, 'dist/monkey'),
    emptyOutDir: true,
  },
  plugins: [
    Vue(),
    tailwindcss(),

    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Weibo Archiver',
        description: '将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭',
        homepage: repo,
        source: `${repo}/tree/main/packages/monkey`,
        icon: 'https://p.chilfish.top/weibo/icon.webp',
        downloadURL,
        updateURL,
        supportURL: `${repo}/issues`,
        author: 'Chilfish',
        license: 'MIT',
        namespace: 'chilfish/monkey',
        match: [
          'https://weibo.com/*',
        ],
        version,
      },
      server: {
        open: false,
      },
      build: {
        metaFileName: true,
        externalGlobals: {
          'vue': [
            'Vue',
            version => `https://unpkg.com/vue@${version}/dist/vue.global.prod.js`,
          ],
          'file-saver': [
            'saveAs',
            _ => 'https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js',
          ],
          'axios': [
            'axios',
            'https://unpkg.com/axios@latest/dist/axios.min.js',
          ],
          'dayjs': [
            'dayjs',
            'https://unpkg.com/dayjs@latest/dayjs.min.js',
          ],
          'fuse.js': [
            'Fuse',
            'https://unpkg.com/fuse.js@latest/dist/fuse.min.js',
          ],
        },
        fileName: 'weibo-archiver.user.js',
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
