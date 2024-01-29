<script setup lang="ts">
const postStore = usePostStore()

const posts = computed(() => postStore.get())
</script>

<template>
  <div
    id="image-scroll-container"
    class="min-h-100vh flex flex-col items-center justify-between bg-light-700 pb-4 dark:bg-dark-700"
  >
    <post-list :posts="posts" />

    <post-pagination />
  </div>
</template>
