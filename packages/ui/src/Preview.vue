<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Post } from '@types'

const postStore = usePostStore()
const posts = ref([] as Post[])
const route = useRoute()

const idLoaded = ref(false)
const postsLoaded = ref(false)

onMounted(async () => {
  const ids = await indexDB.getItem<string[]>('ids')

  postStore.ids = ids || []
  postStore.total = ids?.length ?? 0
  idLoaded.value = true
})

watchEffect(async () => {
  if (!idLoaded.value)
    return
  const page = route.query.page
  posts.value = await postStore.get(Number(page))
  postsLoaded.value = true
})
</script>

<template>
  <div
    class="min-h-90dvh center-col justify-between pb-4"
  >
    <n-spin
      v-if="!idLoaded || !postsLoaded"
      class="center pt-16"
      size="large"
    />

    <template v-if="idLoaded">
      <div
        v-if="postStore.ids.length === 0"
        class="px-6 py-12"
      >
        <settings-about />
        <p
          class="pt-6 font-bold"
          text="center xl"
        >
          暂没微博数据，点击右上角设置来导入吧👋
        </p>
      </div>

      <post-list
        v-else-if="posts.length > 0"
        :posts="posts"
      />

      <h3
        v-else-if="posts.length === 0 && route.path === '/search'"
        class="mt-20 text-center text-2xl font-bold"
      >
        没有相关结果
      </h3>
    </template>
  </div>
</template>
