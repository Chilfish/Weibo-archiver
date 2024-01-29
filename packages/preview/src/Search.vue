<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const { q } = useRoute().query
const postStore = usePostStore()

onBeforeMount(async () => {
  if (q && postStore.resultPosts.length === 0)
    await postStore.searchText(q.toString())
})

onBeforeRouteLeave((to, from) => {
  if (to.path !== from.path)
    postStore.resultPosts = []
})
</script>

<template>
  <main class="mt-12">
    <Preview
      v-if="postStore.resultPosts.length > 0"
    />
    <h1
      v-else
      class="mt-20 text-center text-2xl font-bold"
    >
      没有相关结果
    </h1>
  </main>
</template>
