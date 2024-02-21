import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import type { Options as autoImportOptions } from 'unplugin-auto-import/types'
import type { Options as autoComponentOptions } from 'unplugin-vue-components/types'

export const root = path.resolve(__dirname)
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')
const ui = path.resolve(packages, 'ui/src')

export const autoComponentConfig: autoComponentOptions = {
  dts: path.resolve(root, 'types/auto-components.d.ts'),
  dirs: [
    path.resolve(packages, 'ui/src'),
  ],
  directoryAsNamespace: true,
  types: [{
    from: 'vue-router',
    names: ['RouterLink', 'RouterView'],
  }],
}

export const autoImportConfig: autoImportOptions = {
  imports: [
    'vue',
    '@vueuse/core',
  ],
  dts: path.resolve(root, 'types/auto-imports.d.ts'),
  dirs: [
    core,
    ui,
  ],
  vueTemplate: true,
}

export default defineConfig({
  resolve: {
    alias: {
      '@core': core,
      '@ui': ui,
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
