import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { appDescription } from './src/constants/index'

const {
  DATA_PATH = 'data',
  DB_PATH = 'weibo-data.db',
} = process.env

const packages = fileURLToPath(new URL('../../packages', import.meta.url))
const core = join(packages, 'core')
const ui = join(packages, 'ui')

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',
  dir: {
    public: '../public',
  },
  alias: {
    '@core': core,
    '@ui': ui,
    '@types': join(packages, '../types'),
  },

  modules: [
    '@bg-dev/nuxt-naiveui',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  imports: {
    dirs: [
      'stores',
      'server/utils',
      core,
    ],
  },
  components: {
    dirs: [
      '~/components',
      ui,
    ],
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
    join(ui, 'shared.css'),
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
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  vite: {
    build: {
      reportCompressedSize: false,
    },
  },

  runtimeConfig: {
    dataPath: DATA_PATH,
    dbPath: DB_PATH,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
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
})
