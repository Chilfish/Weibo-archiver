<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Post } from '@types'

const postStore = usePostStore()
const posts = ref([] as Post[])
const route = useRoute()

watchImmediate(() => route.params, async () => {
  posts.value = await postStore.get()
})
</script>

<template>
  <div
    class="min-h-90dvh center-col justify-between pb-4"
  >
    <post-list :posts="posts" />

    <post-pagination
      v-if="posts.length > 0"
    />
  </div>
</template>
