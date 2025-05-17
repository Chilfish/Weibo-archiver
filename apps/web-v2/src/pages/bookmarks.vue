<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import Weibo from '@/components/weibo/Weibo.vue'
import { usePostStore } from '@/stores'
import { onBeforeMount, ref } from 'vue'

const postStore = usePostStore()

const isLoading = ref(false)
const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  await getPosts()
})

async function getPosts() {
  isLoading.value = true
  weiboArr.value = await postStore.getFavorites()
  isLoading.value = false
}
</script>

<template>
  <main
    class="flex flex-col relative w-full"
  >
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

    <div v-if="!weiboArr.length && !isLoading">
      no data
    </div>
  </main>
</template>
