<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const { q, page } = useRoute().query
const postStore = usePostStore()
const curPage = ref(Number(page) || 1)

if (q && postStore.resultPosts.length === 0)
  await useSearch(q.toString())

onBeforeRouteLeave((to, from) => {
  if (to.path !== from.path)
    postStore.resultPosts = []
})
</script>

<template>
  <main>
    <Preview v-model:page="curPage" />
  </main>
</template>
