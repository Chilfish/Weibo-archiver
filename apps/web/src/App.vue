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

const loaded = ref(false)
onNuxtReady(() => {
  const publicStore = usePublicStore()
  const users = localStorage.getItem('users')
  const curUid = localStorage.getItem('curUid')
  publicStore.users = JSON.parse(users || '[]')
  publicStore.curUid = curUid || ''

  loaded.value = true
})
</script>

<template>
  <nuxt-layout>
    <NuxtPage />
  </nuxt-layout>
</template>
