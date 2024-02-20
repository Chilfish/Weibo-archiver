import path from 'node:path'
import { defineConfig } from 'vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

const root = path.resolve(__dirname, '../../')
const packages = path.resolve(root, 'packages')
const core = path.resolve(packages, 'core/src')

export default defineConfig({
  resolve: {
    alias: {
      '@weibo-archiver/core': `${packages}/core/src`,
      '@weibo-archiver/ui': `${packages}/ui/src`,
    },
  },
  build: {
    outDir: path.resolve(root, 'dist'),
    minify: true,
  },
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: path.resolve(core, 'types/auto-imports.d.ts'),
      dirs: [
        path.resolve(core, '**'),
        path.resolve(packages, 'ui/src'),
      ],
      vueTemplate: true,
    }),

    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Weibo Archiver',
        description: '将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭',
        homepage: 'https://github.com/Chilfish/Weibo-Archiver',
        source: 'https://github.com/Chilfish/Weibo-Archiver/tree/main/packages/monkey',
        icon: 'https://weibo.com/favicon.ico',
        namespace: 'chilfish/monkey',
        match: [
          'https://weibo.com/u/*',
          'https://weibo.com/n/*',
        ],
      },
      build: {
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
      },
    }),
  ],
})
