<script setup lang="ts">
const postStore = usePostStore()

const posts = computed(() => postStore.get())
const loaded = ref(false)

watch(posts, async () => {
  if (posts.value.length === 0 || !loaded.value)
    return
  await delay(4000)
  lazyLoadImage()
})

onMounted(() => {
  loaded.value = true
  lazyLoadImage()
})
</script>

<template>
  <div
    class="min-h-100vh flex flex-col items-center justify-between bg-light-700 pb-4 dark:bg-dark-700"
  >
    <post-list :posts="posts" />

    <post-pagination />
  </div>
</template>
