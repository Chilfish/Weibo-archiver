import path from 'node:path'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { InitData } from './packages/core/src/plugins'

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
      resolvers: [ElementPlusResolver()],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: path.resolve(packages, 'components/src/components.d.ts'),
      dirs: [
        path.resolve(packages, 'components/src'),
      ],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),

    UnoCSS(),
    InitData(),
  ],
  build: {
    outDir: path.resolve(root, 'dist'),
    rollupOptions: {
      output: {
        plugins: [
          terser(),
        ],
      },
    },
  },
})
