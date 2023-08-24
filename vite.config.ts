import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const filePath = (name: string) => fileURLToPath(new URL(name, import.meta.url))

const dataJs = filePath('data.js')

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@cp': `${path.resolve(__dirname, 'src/components')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        util.unimportPreset, // monkey GM_api
      ],
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        './src/composables',
        './src/stores',
      ],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './src/types/components.d.ts',
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),

    UnoCSS(),

    // monkey({
    //   entry: 'src/main.ts',
    //   userscript: {
    //     icon: 'https://vitejs.dev/logo.svg',
    //     namespace: 'chilfish/monkey',
    //     match: [
    //       'https://weibo.com/u/*',
    //       'https://weibo.com/n/*',
    //     ],
    //   },
    //   build: {
    //     externalGlobals: {
    //       vue: cdn.unpkg('Vue', 'dist/vue.global.prod.js'),
    //     },
    //     externalResource: {
    //       'element-plus/dist/index.css': cdn.unpkg(),
    //     },
    //   },
    // }),
  ],

  build: {
    rollupOptions: {
      input: {
        index: filePath('index.html'),
        data: dataJs,
      },
      output: {
        entryFileNames: 'assets/[name].js',
        globals: {
          [dataJs]: 'data',
        },
      },
      plugins: [nodeResolve()],
    },
  },
})
