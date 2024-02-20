import { join } from 'node:path'
import { renderer } from 'unplugin-auto-expose'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import VueDevTools from 'vite-plugin-vue-devtools'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import type { UserConfig } from 'vite'

import { chrome } from '../.electron-vendors.cache.json'
import { PACKAGES_ROOT, PROJECT_ROOT } from '../vite.config.base'

const config: UserConfig = {
  root: __dirname,
  envDir: '../',
  base: '',
  resolve: {
    alias: {
      '~/': join(__dirname, `src/`),
      '@core': join(PACKAGES_ROOT, 'core'),
      '@ui': join(PACKAGES_ROOT, 'ui'),
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: join(__dirname, 'dist'),
    assetsDir: '.',
    rollupOptions: {
      input: join(__dirname, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      dts: join(PROJECT_ROOT, 'types/auto-imports.d.ts'),
      dirs: [
        `${PACKAGES_ROOT}/core`,
        'src/composables',
      ],
      vueTemplate: true,
    }),

    Components({
      dts: join(PROJECT_ROOT, 'types/auto-components.d.ts'),
      dirs: [
        `${PACKAGES_ROOT}/ui`,
        'src/components',
      ],
      resolvers: [
        NaiveUiResolver(),
      ],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),

    // https://github.com/antfu/unocss
    UnoCSS(),

    VueDevTools(),

    renderer.vite({
      preloadEntry: join(__dirname, '../preload/src/index.ts'),
    }),
  ],
}

export default config
