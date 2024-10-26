<script setup lang="ts">
import type { Post, User } from '@shared'
import { KeyUser } from '@core/constants/vueProvide'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const hasPosts = defineModel('hasPosts', {
  type: Boolean,
  default: false,
})

const postStore = usePostStore()
const { curUid, curUser } = storeToRefs(usePublicStore())
const { totalDB } = storeToRefs(postStore)

const route = useRoute()
const router = useRouter()
const message = useMessage()

const posts = ref([] as Post[])

const loaded = ref(false)
const postsLoaded = ref(false)

provide(KeyUser, curUser as unknown as User)

onMounted(async () => {
  // 删除旧版数据
  // await deleteOld()

  if (!curUid.value) {
    loaded.value = true
    postsLoaded.value = true
    return
  }

  await postStore.init()

  loaded.value = true

  if (postStore.total === 0) {
    message.warning('还未导入数据，请先导入数据')
    router.push('/')
  }
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
    hasPosts.value = totalDB.value > 0
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
    v-if="loaded && hasPosts"
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
