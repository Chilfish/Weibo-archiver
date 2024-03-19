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
    '@nuxtjs/seo',
    'dayjs-nuxt',
  ],

  dayjs: {
    locales: ['zh-cn'],
    plugins: ['timezone'],
    defaultTimezone: 'Asia/Shanghai',

  },

  alias: {
    '@core': join(root, 'packages/core/src'),
  },

  imports: {
    dirs: [
      'stores',
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
    static: true,
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

  site: {
    url: 'https://weibo.chilfish.top',
    name: 'Weibo Archiver',
    defaultLocale: 'zh-cn',
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
