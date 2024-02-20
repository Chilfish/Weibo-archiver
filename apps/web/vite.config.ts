import path from 'node:path'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import config, { autoComponentConfig, autoImportConfig, core, root } from '../../vite.config'

const dataJs = path.resolve(core, 'constants/data.mjs')
const index = path.resolve('./index.html')

export default defineConfig({
  ...config,
  build: {
    rollupOptions: {
      ...config.build?.rollupOptions,
      input: {
        index,
        data: dataJs,
      },
      output: {
        entryFileNames: 'assets/[name].mjs',
        globals: {
          [dataJs]: 'data',
        },
      },
    },
    outDir: path.resolve(root, 'dist/preview'),
  },
  plugins: [
    ...config.plugins!,
    AutoImport({
      ...autoImportConfig,
      imports: [
        ...autoImportConfig.imports as any[],
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    Components({
      ...autoComponentConfig,
      resolvers: [
        NaiveUiResolver(),
      ],
    }),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(root, 'scripts/*')),
          dest: normalizePath(path.resolve(root, 'dist/preview')),
        },
      ],
    }),
  ],
})
