<script setup lang="ts">
import type { Post } from '@types'
import { deleteOld } from '@core/utils/storage'
import { storeToRefs } from 'pinia'

const postStore = usePostStore()
const { curUid, users } = storeToRefs(usePublicStore())
const { totalDB } = storeToRefs(postStore)

const route = useRoute()

const posts = ref([] as Post[])

const loaded = ref(false)
const postsLoaded = ref(false)

onMounted(async () => {
  // 删除旧版数据
  await deleteOld()

  if (!curUid.value) {
    loaded.value = true
    postsLoaded.value = true
    return
  }

  await postStore.init()

  loaded.value = true
})

watchImmediate(
  [() => route.query, loaded, totalDB, curUid],

  async () => {
    postsLoaded.value = false

    if (!loaded.value)
      return

    if (!route.query.start)
      posts.value = await postStore.get()
    postsLoaded.value = true
  },
)
</script>

<template>
  <n-spin
    v-if="!loaded"
    class="center p-16"
    size="large"
  />

  <div
    v-else-if="totalDB === 0"
    class="px-6 py-12"
  >
    <settings-about />
    <div
      class="py-6 text-center"
    >
      <p class="mb-2 text-xl font-bold">
        暂无微博数据，点击右上角设置来导入吧👋
      </p>
      <p>
        或者点击 <RouterLink to="/example">
          这里
        </RouterLink> 查看示例数据
      </p>
    </div>

    <div
      v-if="users.length"
      class="mx-auto w-fit"
    >
      <p class="mb-3 text-4.5">
        不过检测到了可导入的用户
      </p>

      <div class="center-col gap-4">
        <User-profile
          v-for="user in users"
          :key="user.uid"
          :user="user"
          class="w-full sm:w-50vw"
          bg="light-4 dark:dark-2"
        />
      </div>
    </div>
  </div>

  <div
    v-else
    class="min-h-90dvh center-col justify-start p-4 pb-8"
  >
    <DatePick
      @picked="(data: Post[]) => posts = data"
    />

    <n-spin
      v-if="!postsLoaded"
      class="center p-16"
      size="large"
    />

    <h3
      v-else-if="posts.length === 0"
      class="mb-auto mt-20 text-center text-2xl font-bold"
    >
      没有相关结果
    </h3>

    <post-list :posts="posts" />
    <post-pagination v-show="posts.length" />
  </div>
</template>
