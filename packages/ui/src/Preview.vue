<script setup lang="ts">
import type { Post } from '@types'

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

onBeforeMount(async () => {
  const data = await indexDB.getItem<Post[]>('posts')
  postStore.set(data ?? [])

  const user = postStore.posts[0]?.user
  localStorage.setItem('user', JSON.stringify({
    uid: user?.id,
    name: user?.screen_name,
  }))
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
