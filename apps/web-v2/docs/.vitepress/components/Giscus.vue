<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})
const theme = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <div class="mt-12">
    <Giscus
      repo="Chilfish/Weibo-archiver"
      repo-id="R_kgDOKKCfMw"
      category="General"
      category-id="DIC_kwDOKKCfM84Cc3L2"
      mapping="title"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      lang="zh-CN"
      loading="lazy"
      crossorigin="anonymous"
      async
      :theme="theme"
    />
  </div>
</template>
