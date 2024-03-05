<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Post } from '@types'
import { deleteOld } from '@core/utils/storage'

const postStore = usePostStore()
const publicStore = usePublicStore()

const posts = ref([] as Post[])
const route = useRoute()

const loaded = ref(false)
const postsLoaded = ref(false)

onMounted(async () => {
  // 删除旧版数据
  await deleteOld()
  await postStore.updateTotal()
  loaded.value = true

  posts.value = await postStore.get(Number(route.query.page))

  if (publicStore.users.length === 0) {
    const user = posts.value[0].user
    publicStore.users.push({
      uid: user.id,
      name: user.screen_name,
    })
  }
  postsLoaded.value = true
})

watch(() => [route.query, postStore.totalDB], async () => {
  if (!loaded.value)
    return
  postsLoaded.value = false

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
      v-if="!loaded || !postsLoaded"
      class="center pt-16"
      size="large"
    />

    <template v-if="loaded">
      <div
        v-if="postStore.totalDB === 0"
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
