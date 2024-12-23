import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import pkg from './package.json'

const commitHash = execSync('git rev-parse --short HEAD').toString().trimEnd()
const commitUrl = `https://github.com/Chilfish/Weibo-archiver/commit/${commitHash}`

const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd()
const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd()

const root = fileURLToPath(new URL('../../', import.meta.url))
const core = path.join(root, 'packages/core/src')
const shared = path.join(root, 'packages/shared/src')
const ui = path.join(root, 'packages/ui/src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@core': core,
      '@shared': shared,
      '@ui': ui,
    },
  },
  plugins: [
    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
    VueJsx(),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: 'src/auto-components.d.ts',
      dirs: [
        './src/components',
        ui,
      ],
      directoryAsNamespace: true,
      resolvers: [
        NaiveUiResolver(),
      ],
    }),

    // https://github.com/antfu/unocss
    UnoCSS(),
  ],
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __COMMIT_DATE__: JSON.stringify(commitDate),
    __COMMIT_URL__: JSON.stringify(commitUrl),
    __LAST_COMMIT_MESSAGE__: JSON.stringify(lastCommitMessage),
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
