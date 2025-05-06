<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { useEmoji } from '@/composables'
import { usePostStore, useUserStore } from '@/stores'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ImagePreview from '../common/ImagePreview.vue'
import Pagination from '../common/Pagination.vue'
import EmptyWeibo from '../EmptyWeibo.vue'
import Weibo from './Weibo.vue'

const emits = defineEmits<{
  reload: []
}>()

const postStore = usePostStore()
const userStore = useUserStore()
const { fetchEmojis } = useEmoji()

const route = useRoute()
const router = useRouter()

const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  if (userStore.curUid === '0') {
    return
  }

  postStore.loading = true
  await postStore.setup()
  await fetchEmojis()

  weiboArr.value = await postStore.getPosts()
})

watch(() => postStore.importing, async (importing) => {
  if (importing === false)
    weiboArr.value = await postStore.getPosts()
})

watch([
  () => userStore.curUid,
  () => route.query,
], async ([curUid, query], [oldUid, oldQuery]) => {
  if (query.page && oldQuery.page && curUid === oldUid) {
    return
  }
  postStore.loading = true
  await postStore.setup()

  postStore.curPage = 1
  await router.push({
    query: {
      page: 1,
    },
  })

  weiboArr.value = await postStore.getPosts()

  emits('reload')
})

async function changePage(page: number, pageSize: number) {
  emits('reload')

  postStore.pageSize = pageSize
  postStore.curPage = page

  await router.push({
    query: {
      ...route.query,
      page,
      pageSize,
    },
  })

  weiboArr.value = await postStore.getPosts()
}
</script>

<template>
  <section
    v-if="weiboArr.length > 0"
    class="flex flex-col gap-4 lg:px-12"
  >
    <Weibo
      v-for="post in weiboArr"
      :key="post.id"
      :post="post"
    />

    <Pagination
      v-model:current="postStore.curPage"
      v-model:page-size="postStore.pageSize"
      :total="postStore.total"
      class="mt-4"
      @change="changePage"
    />
  </section>

  <EmptyWeibo v-if="!weiboArr.length && !postStore.loading" />
  <ImagePreview />
</template>
