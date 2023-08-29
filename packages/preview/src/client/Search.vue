<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const { q } = useRoute().query
const postStore = usePostStore()
const curPage = ref(1)

if (q && postStore.resultPosts.length === 0)
  await useSearch(q.toString())

onBeforeRouteLeave((to, from) => {
  if (to.path !== from.path)
    postStore.resultPosts = []
})
</script>

<template>
  <main>
    <Preview
      v-if="postStore.resultPosts.length > 0"
      :page="curPage"
    />
    <h1
      v-else
      class="mt-20 text-center text-2xl font-bold"
    >
      没有相关结果: {{ q }}
    </h1>
  </main>
</template>
