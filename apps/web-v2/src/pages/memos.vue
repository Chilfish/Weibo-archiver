<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import Weibo from '@/components/weibo/Weibo.vue'
import { usePostStore } from '@/stores'
import { onBeforeMount, ref } from 'vue'

const postStore = usePostStore()

const isLoading = ref(false)
const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  isLoading.value = true
  weiboArr.value = await postStore.getTodayInLastYears().catch((e) => {
    console.error(e)
    return []
  })
  isLoading.value = false
})
</script>

<template>
  <main
    v-if="!isLoading"
  >
    <h2
      class="font-bold text-xl mb-4"
    >
      微博回忆——那年今日 ({{ weiboArr.length }}件)
    </h2>

    <section
      v-if="weiboArr.length > 0"
      class="flex flex-col items-center max-w-[90vw] md:max-w-[70vw] mx-auto gap-4 lg:px-12"
    >
      <Weibo
        v-for="post in weiboArr"
        :key="post.id"
        :post="post"
      />
    </section>

    <div
      v-else
      class="text-center text-secondary-foreground"
    >
      暂时未发现过往在这一天发过的微博哦
    </div>
  </main>
</template>
