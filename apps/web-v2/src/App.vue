<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useDark } from '@vueuse/core'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import ImagePreview from '@/components/common/ImagePreview.vue'
import { useEmoji } from '@/composables'
import { useUserStore } from '@/stores'

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

const _isDark = useDark()
const route = useRoute()
const isIndex = computed(() => route.name === 'index')

const userStore = useUserStore()
const { fetchEmojis } = useEmoji()
const isLoading = ref(false)

onBeforeMount(async () => {
  isLoading.value = true
  await userStore.load()
  await fetchEmojis()
  isLoading.value = false
})
</script>

<template>
  <RouterView v-if="isIndex" />

  <SidebarProvider v-else>
    <AppSidebar />
    <RouterView
      v-if="!isLoading"
      class="m-6  w-full"
    />
    <ImagePreview />
  </SidebarProvider>
</template>
