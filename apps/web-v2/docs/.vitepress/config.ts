import { defineConfig } from 'vitepress'

const baseUrl = 'https://weibo-archiver.chilfish.top'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Weibo archiver 文档',
  description:
    'Weibo Archiver 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。',
  base: '/docs/',
  outDir: '../dist/docs',
  head: [
    ['link', { rel: 'icon', href: `${baseUrl}/icon.webp` }],
    ['meta', { name: 'og:title', content: 'Weibo archiver 文档' }],
    [
      'meta',
      {
        name: 'og:description',
        content:
          'Weibo Archiver 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。',
      },
    ],
    ['meta', { name: 'og:image', content: `${baseUrl}/cover.webp` }],
    ['meta', { name: 'og:image:alt', content: 'Weibo-Archiver' }],
    ['meta', { name: 'og:site_name', content: 'Weibo-Archiver' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:url', content: `${baseUrl}/docs` }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'meta',
      { name: 'twitter:title', content: 'Weibo-Archiver - 备份你的微博' },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Weibo Archiver 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。',
      },
    ],
    ['meta', { name: 'twitter:creator', content: 'chilfish_' }],
    ['meta', { name: 'twitter:image', content: `${baseUrl}/cover.webp` }],
    ['meta', { name: 'twitter:image:alt', content: 'Weibo-Archiver' }],
    ['meta', { name: 'twitter:site', content: '@chilfish_' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          '微博,备份,工具,微博备份,微博备份工具,备份微博,存档,油猴脚本,backup',
      },
    ],
  ],
  markdown: {
    theme: 'vitesse-dark',
    image: {
      lazyLoading: true,
    },
    headers: {
      level: [2, 3, 4],
    },
  },
  sitemap: {
    hostname: `${baseUrl}/docs`,
  },
  themeConfig: {
    nav: [
      { text: '在线查看', link: `${baseUrl}/post` },
      { text: '下载油猴脚本', link: `${baseUrl}/monkey` },
    ],

    sidebar: [
      {
        text: '介绍',
        link: '/intro',
      },
      {
        text: '安装浏览器插件',
        link: '/extension',
      },
      {
        text: '在线网页查看',
        link: '/web',
      },
      {
        text: '使用油猴脚本',
        link: '/monkey',
      },
      {
        text: '图片服务器',
        link: '/server',
      },
      {
        text: 'CLI 应用',
        link: '/cli',
      },
      {
        text: 'FAQ 及使用经验',
        link: '/faq',
      },
      {
        text: '路线图',
        link: '/roadmap',
      },
      {
        text: '开发文档',
        items: [
          {
            text: '开发文档',
            link: '/dev',
          },
          {
            text: 'Core 公共包',
            link: '/dev/core',
          },
          {
            text: '浏览器插件',
            link: '/dev/extension',
          },
          {
            text: '网页端',
            link: '/dev/web',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chilfish/Weibo-archiver' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/259486090' },
      { icon: 'gmail', link: 'mailto:chilfish@qq.com' },
    ],
  },
})
