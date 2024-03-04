import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../../', import.meta.url))

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
  ],

  alias: {
    '@core': join(root, 'packages/core/src'),
  },

  imports: {
    dirs: [
      'stores',
      'server/utils',
      join(root, 'packages/core/src'),
    ],
  },
  components: {
    dirs: [
      join(root, 'packages/ui/src'),
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
    routeRules: {
      '/': { redirect: '/post' },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/post'],
    },
  },

  vite: {
    build: {
      rollupOptions: {
        external: ['conf'],
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/icon.png', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  typescript: {
    tsConfig: {
      extends: join(root, 'tsconfig.json'),
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
