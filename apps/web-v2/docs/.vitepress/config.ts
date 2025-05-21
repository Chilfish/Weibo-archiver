import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Weibo archiver 文档',
  description: 'A VitePress Site',
  base: '/docs/',
  outDir: '../dist/docs',
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
    hostname: 'https://weibo.archiver.chilfish.top/docs',
  },
  themeConfig: {
    nav: [
      { text: '在线查看', link: 'https://weibo-archiver.chilfish.top/post' },
      { text: '下载油猴脚本', link: 'https://p.chilfish.top/weibo/weibo-archiver.user.js' },
    ],

    sidebar: [
      {
        text: '介绍',
        link: '/intro',
      },
      {
        text: '使用油猴脚本',
        link: '/monkey',
      },
      {
        text: '在线网页查看',
        link: '/web',
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chilfish/Weibo-archiver' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/259486090' },
      { icon: 'gmail', link: 'mailto:chilfish@qq.com' },
    ],
  },
})
