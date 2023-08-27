import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { CpScripts, InitData } from './packages/core/src/plugins'

export const root = path.resolve(__dirname)
export const packages = path.resolve(root, 'packages')
export const core = path.resolve(packages, 'core/src')

export default defineConfig({
  resolve: {
    alias: {
      '@/': root,
      '@core/': core,
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
      ],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: path.resolve(core, 'types/components.d.ts'),
      dirs: [
        path.resolve(core, 'components'),
      ],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),

    UnoCSS(),
    InitData(),
    CpScripts(),
  ],
})
