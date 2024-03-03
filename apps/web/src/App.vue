<script setup lang="ts">
const appName = 'Weibo-Archiver'
const title = computed(() => {
  const name = ''
  return name ? `@${name} - ${appName}` : `${appName} - 备份你的微博`
})

const description = `${appName} 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。`
const ogImage = 'https://p.chilfish.top/weibo/cover.webp'

useHead({
  title,
})

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
})
</script>

<template>
  <nuxt-layout>
    <nuxt-loading-indicator />
    <client-only>
      <nuxt-page />
    </client-only>
  </nuxt-layout>
</template>
