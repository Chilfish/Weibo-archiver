import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import pkg from './package.json'

const base = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(base, '../../')
const workspace = path.join(root, 'packages/')

const { commitHash, commitDate, commitUrl, lastCommitMessage } = getGitInfo()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@weibo-archiver/core': `${workspace}/core/`,
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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

    tailwindcss(),
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
