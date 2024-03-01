<script setup lang="ts">
const postStore = usePostStore()

const posts = computed(() => postStore.get())
const loaded = ref(false)

watch(posts, async () => {
  if (posts.value.length === 0 || !loaded.value)
    return
  await delay(4000)
})

onMounted(() => {
  loaded.value = true
})
</script>

<template>
  <div
    class="min-h-90dvh center-col justify-between pb-4"
  >
    <post-list :posts="posts" />

    <post-pagination />
  </div>
</template>
