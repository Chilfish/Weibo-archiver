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

const root = fileURLToPath(new URL('../../', import.meta.url))
const workspace = path.join(root, 'packages/')
const core = path.join(root, 'packages/core/src')
const shared = path.join(root, 'packages/shared/src')
const ui = path.join(root, 'packages/ui/src')

const { commitHash, commitDate, commitUrl, lastCommitMessage } = getGitInfo()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@core': core,
      '@shared': shared,
      '@ui': ui,
      '@workspace/ui': `${workspace}/ui/`,
      '@workspace/shared': `${workspace}/shared/`,
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

function getGitInfo() {
  const repoUrl = 'https://github.com/Chilfish/Weibo-archiver/commit'
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trimEnd()
    const commitUrl = `${repoUrl}/${commitHash}`

    const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd()
    const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd()

    return { commitHash, commitDate, commitUrl, lastCommitMessage }
  }
  catch {
    // https://vercel.com/docs/projects/environment-variables/system-environment-variables#VERCEL_GIT_COMMIT_SHA
    const {
      VERCEL_GIT_COMMIT_SHA: commitHash,
      VERCEL_GIT_COMMIT_DATE: commitDate,
      VERCEL_GIT_COMMIT_MESSAGE: lastCommitMessage,
    } = process.env

    const shortCommitHash = commitHash?.slice(0, 7)

    return {
      commitHash: shortCommitHash,
      commitDate: commitDate || new Date().toISOString(),
      commitUrl: `${repoUrl}/${shortCommitHash}`,
      lastCommitMessage,
    }
  }
}
