<script setup lang="ts">
const appName = 'Weibo-Archiver'
const title = `${appName} - 备份你的微博`
const description = `${appName} 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。`
const ogImage = 'https://p.chilfish.top/weibo/cover.webp'

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogImage,
  ogImageAlt: appName,
  ogSiteName: appName,
  ogType: 'website',
  ogUrl: 'https://weibo.chilfish.top',
  ogLocale: 'zh_CN',
  ogTitle: title,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterCreator: 'chilllish',
  twitterImage: ogImage,
  twitterImageAlt: appName,
  twitterSite: '@chilllish',
  keywords: '微博,备份,工具,微博备份,微博备份工具,备份微博,存档,油猴脚本,backup',
})

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})

const route = useRoute()
const clientOnlyRoutes = ['/album']

const isClientOnly = computed(() => clientOnlyRoutes.includes(route.path))
</script>

<template>
  <NuxtLayout>
    <ClientOnly v-if="isClientOnly">
      <NuxtPage />
    </ClientOnly>

    <NuxtPage v-else />
  </NuxtLayout>
</template>
