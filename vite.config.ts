import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

export const root = path.resolve(__dirname)
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')

export default defineConfig({
  resolve: {
    alias: {
      '@weibo-archiver/': `${packages}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
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
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: path.resolve(packages, 'components/src/components.d.ts'),
      dirs: [
        path.resolve(packages, 'components/src'),
      ],
      directoryAsNamespace: true,
    }),

    UnoCSS(),
  ],
  build: {
    outDir: path.resolve(root, 'dist'),
    minify: true,
  },
})
