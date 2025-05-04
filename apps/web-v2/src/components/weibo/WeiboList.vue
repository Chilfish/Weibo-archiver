<script setup lang="ts">
import { useEmoji } from '@/composables'
import { usePostStore, usePublicStore } from '@weibo-archiver/core'
import { onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ImagePreview from '../common/ImagePreview.vue'
import Pagination from '../common/Pagination.vue'
import EmptyWeibo from '../EmptyWeibo.vue'
import Weibo from './Weibo.vue'

const emits = defineEmits<{
  reload: []
}>()

const postStore = usePostStore()
const publicStore = usePublicStore()
const { fetchEmojis } = useEmoji()

const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  postStore.loading = true
  await Promise.all([
    fetchEmojis(),
    postStore.init(),
  ])
})

watch([
  () => publicStore.curUid,
  () => route.query,
], async ([curUid, query], [oldUid, oldQuery]) => {
  if (query.page && oldQuery.page && curUid === oldUid) {
    return
  }
  postStore.loading = true

  postStore.curPage = 1
  await router.push({
    query: {
      page: 1,
    },
  })
  await postStore.init()

  emits('reload')
})

function changePage(page: number, pageSize: number) {
  emits('reload')

  postStore.get(page).then(res => res.map(post => ({
    ...post,
    user: publicStore.curUser,
  })))

  router.push({
    query: {
      ...route.query,
      page,
      pageSize,
    },
  })
}
</script>

<template>
  <template v-if="!postStore.loading">
    <section
      v-if="postStore.weiboArr.length > 0"
      class="flex flex-col gap-4 lg:px-12"
    >
      <Weibo
        v-for="post in postStore.weiboArr"
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

    <EmptyWeibo v-else />
  </template>

  <div
    v-else
    class="flex flex-col items-center justify-center h-full"
  >
    <span class="loading w-16" />
  </div>
  <ImagePreview />
</template>
