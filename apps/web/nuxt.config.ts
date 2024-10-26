import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const commitHash = execSync('git rev-parse --short HEAD').toString().trimEnd()
const commitUrl = `https://github.com/Chilfish/Weibo-archiver/commit/${commitHash}`

const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd()
const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd()

process.env.VITE_GIT_COMMIT_DATE = commitDate
process.env.VITE_GIT_COMMIT_HASH = commitHash
process.env.VITE_GIT_LAST_COMMIT_MESSAGE = lastCommitMessage
process.env.VITE_GIT_COMMIT_URL = commitUrl

const root = fileURLToPath(new URL('../../', import.meta.url))
const core = join(root, 'packages/core/src')
const shared = join(root, 'packages/shared/src')
const ui = join(root, 'packages/ui/src')

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: 'server',

  dir: {
    public: '../public',
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/seo',
    'dayjs-nuxt',
  ],

  dayjs: {
    locales: ['zh-cn'],
    plugins: ['timezone'],
    defaultTimezone: 'Asia/Shanghai',
  },

  alias: {
    '@core': core,
    '@shared': shared,
    '@ui': ui,
  },

  imports: {
    dirs: [
      core,
      shared,
    ],
  },

  components: {
    dirs: [ui],
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    join(root, 'packages/ui/src/shared.css'),
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    static: true,
    routeRules: {
      // '/': { redirect: '/post' },
      '/docs': { redirect: 'https://docs.qq.com/doc/DTWttbXlMUGxZZnZq' },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/icon.webp', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  site: {
    url: 'https://weibo.chilfish.top',
    name: 'Weibo Archiver',
    defaultLocale: 'zh-cn',
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: [
          'naive-ui/volar',
        ],
      },
      include: [
        shared,
        ui,
        core,
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  // fix: unocss + nuxt3.9 error
  // @see at https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
  features: {
    inlineStyles: false,
  },

  compatibilityDate: '2024-10-26',
})
