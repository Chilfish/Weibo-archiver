<script setup lang="ts">
import { appDescription, appName } from './constants'

const host = useRequestURL().origin
const img = `${host}/favicon.ico`

useSeoMeta({
  title: appName,
  description: appDescription,
  twitterTitle: appName,
  twitterDescription: appDescription,
  twitterImage: img,
  twitterCard: 'summary',
  ogUrl: host,
  ogImage: img,
  ogDescription: appDescription,
  ogTitle: appName,
})

useHead({
  htmlAttrs: {
    lang: 'zh-Hant',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <MainApp>
      <NuxtPage />
    </mainapp>
  </NuxtLayout>
</template>
