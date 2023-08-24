import path from 'node:path'
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'
import config, { root } from '../../vite.config'

const { plugins } = config

export default defineConfig({
  ...config,
  build: {
    outDir: path.resolve(root, 'dist'),
  },
  plugins: [
    ...plugins!,
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'chilfish/monkey',
        match: [
          'https://weibo.com/u/*',
          'https://weibo.com/n/*',
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.unpkg('Vue', 'dist/vue.global.prod.js'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.unpkg(),
        },
        fileName: 'weibo-archiver.user.js',
      },
    }),
  ],
})
