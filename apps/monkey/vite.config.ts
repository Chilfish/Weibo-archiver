import { defineConfig } from 'vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'

import config, { autoImportConfig } from '../../vite.config'

console.log(config)

export default defineConfig({
  ...config,
  plugins: [
    ...config.plugins!,
    AutoImport(autoImportConfig),

    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Weibo Archiver',
        description: '将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭',
        homepage: 'https://github.com/Chilfish/Weibo-Archiver',
        source: 'https://github.com/Chilfish/Weibo-Archiver/tree/main/packages/monkey',
        icon: 'https://github.com/Chilfish/Weibo-archiver/raw/main/docs/Speechless48.png',
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
