import path from 'node:path'
import { defineConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import config, { autoComponentConfig, autoImportConfig, root } from '../../vite.config'

export default defineConfig({
  ...config,
  build: {
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
  ],
})
