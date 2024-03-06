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
})

const route = useRoute()

const { client } = route.meta as {
  client: boolean
}
</script>

<template>
  <nuxt-layout>
    <ClientOnly v-if="client">
      <NuxtPage />
    </ClientOnly>

    <NuxtPage v-else />
  </nuxt-layout>
</template>
