import path from 'node:path'
import { defineConfig } from 'vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export const root = path.resolve(__dirname, '../../')
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')
const ui = path.resolve(packages, 'ui/src')

const repo = 'https://github.com/Chilfish/Weibo-archiver'
const downloadURL = `${repo}/raw/monkey/weibo-archiver.user.js`
const updateURL = `${repo}/raw/monkey/weibo-archiver.meta.js`

export default defineConfig({
  resolve: {
    alias: {
      '@core': core,
      '@ui': ui,
    },
  },
  build: {
    minify: true,
    outDir: path.join(root, 'dist/monkey'),
    emptyOutDir: true,
  },
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        util.unimportPreset,
      ],
      dts: path.resolve(root, 'types/auto-imports.d.ts'),
      dirs: [
        core,
        ui,
      ],
      vueTemplate: true,
    }),

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
          'https://weibo.com/u/*',
          'https://weibo.com/n/*',
          'https://weibo.chilfish.top/*',
        ],
        grant: [
          'GM_setValue',
          'GM_getValue',
        ],
      },
      server: {
        mountGmApi: true,
        open: false,
      },
      build: {
        metaFileName: true,
        externalGlobals: {
          'vue': cdn.unpkg('Vue', 'dist/vue.global.prod.js')
            .concat(util.dataUrl(';window.Vue=Vue;')),
          'pinia': [
            'Pinia',
            'https://unpkg.com/vue-demi@latest/lib/index.iife.js',
            version => `https://unpkg.com/pinia@${version}/dist/pinia.iife.js`,
          ],
          // 'naive-ui': cdn.unpkg('naive-ui', 'dist/index.prod.js'),
          'file-saver': [
            'saveAs',
            _ => 'https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js',
          ],
        },
        fileName: 'weibo-archiver.user.js',
        externalResource: {
          'naive-ui/dist/index.css': cdn.unpkg(),
        },
      },
    }),
  ],
})
