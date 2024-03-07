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
  console.log(publicStore.curUid)

  if (!publicStore.curUid) {
    loaded.value = true
    postsLoaded.value = true
    return
  }

  await postStore.updateTotal()

  loaded.value = true
  posts.value = await postStore.get(Number(route.query.page))

  postsLoaded.value = true
})

watch(() => [route.query, postStore.totalDB, publicStore.curUid], async () => {
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
          class="py-6 font-bold"
          text="center xl"
        >
          暂没微博数据，点击右上角设置来导入吧👋
        </p>

        <div v-if="publicStore.users.length">
          <p class="mb-3 text-4.5">
            不过检测到了可导入的用户
          </p>

          <div class="center-col gap-4">
            <User-profile
              v-for="user in publicStore.users"
              :key="user.uid"
              :user="user"
              bg="light-4 dark:dark-2"
            />
          </div>
        </div>
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
