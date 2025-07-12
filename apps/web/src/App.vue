<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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

const isIndex = computed(() => route.path === '/')
</script>

<template>
  <app-main>
    <main-header v-if="!isIndex" />
    <img-viewer />
    <main
      :class="{
        'pt-16': !isIndex,
      }"
    >
      <n-alert
        class="mx-auto my-2 w-50%"
        title="升级迁移通知"
        type="warning"
        closable
      >
        网站和油猴脚本已经升级改版，迁移到了
        <a
          href="https://weibo-archiver.chilfish.top/"
          target="_blank"
        >
          weibo-archiver.chilfish.top
        </a>。
        <br>
        新的数据文件不再支持导入到本网站，可查看
        <a
          href="https://weibo-archiver.chilfish.top/docs/intro.html#从旧版本迁移"
          target="_blank"
        >
          迁移文档
        </a>
        完成数据迁移。
      </n-alert>
      <router-view />
    </main>
  </app-main>
</template>
