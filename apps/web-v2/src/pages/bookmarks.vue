<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, scrollToTop } from '@weibo-archiver/core'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'
import Weibo from '@/components/weibo/Weibo.vue'
import { usePostStore } from '@/stores'

const postStore = usePostStore()

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)

const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  postsTotal.value = await postStore.getAllFavoritesTotal()
  await getPosts()
})

async function getPosts() {
  isLoading.value = true
  weiboArr.value = await postStore.getFavorites(curPage.value, pageSize.value)
  isLoading.value = false
}

async function changePage(newPage: number, newPageSize: number) {
  pageSize.value = newPageSize
  curPage.value = newPage

  await router.push({
    query: {
      ...route.query,
      page: newPage,
      pageSize: newPageSize,
    },
  })
  await getPosts()
  scrollToTop()
}
</script>

<template>
  <main
    class="flex flex-col relative w-full"
  >
    <h2
      class="text-xl font-bold mb-4"
    >
      微博收藏
    </h2>

    <section
      v-if="weiboArr.length > 0"
      class="flex flex-col items-center max-w-[90vw] md:max-w-[70vw] mx-auto gap-4 lg:px-12"
    >
      <Weibo
        v-for="post in weiboArr"
        :key="post.id"
        :post="post"
      />

      <Pagination
        v-model:current="curPage"
        v-model:page-size="pageSize"
        :total="postsTotal"
        class="mt-4"
        @change="changePage"
      />
    </section>

    <div
      v-if="!weiboArr.length && !isLoading"
      class="text-center text-secondary-foreground"
    >
      暂无收藏
    </div>
  </main>
</template>
