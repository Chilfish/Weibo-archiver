<script setup lang="ts">
import { usePostStore, usePublicStore } from '@weibo-archiver/core'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmoji } from '../../composables'
import ImagePreview from '../common/ImagePreview.vue'
import Pagination from '../common/Pagination.vue'
import EmptyWeibo from '../EmptyWeibo.vue'

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

function changePage(page: number, pageSize: number) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

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
      v-if="postStore.weibos.length > 0"
      class="flex flex-col gap-4"
    >
      <Weibo
        v-for="post in postStore.weibos"
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
