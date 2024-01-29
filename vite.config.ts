import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import type { Options as autoImportOptions } from 'unplugin-auto-import/types'
import type { Options as autoComponentOptions } from 'unplugin-vue-components/types'

export const root = path.resolve(__dirname)
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')

export const autoComponentConfig: autoComponentOptions = {
  dts: path.resolve(packages, 'components/src/components.d.ts'),
  dirs: [
    path.resolve(packages, 'components/src'),
  ],
  directoryAsNamespace: true,
}

export const autoImportConfig: autoImportOptions = {
  imports: [
    'vue',
    '@vueuse/core',
  ],
  dts: path.resolve(core, 'types/auto-imports.d.ts'),
  dirs: [
    path.resolve(core, '**'),
    path.resolve(packages, 'components/src'),
  ],
  vueTemplate: true,
}

export default defineConfig({
  resolve: {
    alias: {
      '@weibo-archiver/': `${packages}/`,
    },
  },
  plugins: [
    Vue(),
    UnoCSS(),
  ],
  build: {
    outDir: path.resolve(root, 'dist'),
    minify: true,
  },
})
