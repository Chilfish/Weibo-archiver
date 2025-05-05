<script setup lang="ts">
import type { SearchQuery } from '@/composables'
import type { Post } from '@weibo-archiver/core'
import SearchBar from '@/components/SearchBar.vue'
import { ref } from 'vue'

const posts = ref<Post[]>()

async function searchPosts(query: SearchQuery) {
  console.log(query)
}
</script>

<template>
  <main
    class="flex flex-col items-center w-full gap-6"
  >
    <SearchBar @search="searchPosts" />
    <h1>开发中……</h1>

    <pre>
       {{ posts }}
     </pre>
  </main>
</template>

<style scoped>

</style>
