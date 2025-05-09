<script setup lang="ts">
import type { SearchQuery } from '@/composables/useSearch'
import type { Post } from '@weibo-archiver/core'
import Pagination from '@/components/common/Pagination.vue'
import SearchBar from '@/components/SearchBar.vue'
import Weibo from '@/components/weibo/Weibo.vue'
import { useSearch } from '@/composables/useSearch'
import { usePostStore } from '@/stores'
import { DEFAULT_PAGE_SIZE } from '@weibo-archiver/core'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const postStore = usePostStore()
const route = useRoute()
const router = useRouter()
const { toSearchQuery } = useSearch()

const isLoading = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const pageSize = ref(DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)
const searchQuery = ref<SearchQuery>(toSearchQuery())

const weiboArr = ref<Post[]>([])

async function searchPosts() {
  const { posts, total } = await postStore.searchPosts(searchQuery.value!, curPage.value, pageSize.value)

  weiboArr.value = posts
  postsTotal.value = total
  scrollToTop()

  await router.push({
    query: {
      ...route.query,
      page: curPage.value,
    },
  })
}

async function onSearch(query: SearchQuery) {
  searchQuery.value = query
  curPage.value = 1

  await router.push({
    query: {
      q: query.searchText,
      page: 1,
    },
  })

  await searchPosts()
}

const mainRef = useTemplateRef<HTMLElement>('mainRef')
function scrollToTop() {
  mainRef.value!.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  if (route.query.q) {
    await searchPosts()
  }
})
</script>

<template>
  <main
    ref="mainRef"
    class="flex flex-col items-center w-full gap-6"
  >
    <SearchBar
      @search="onSearch"
    />

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
        v-model:current="curPage"
        v-model:page-size="pageSize"
        :total="postsTotal"
        class="mt-4"
        @change="searchPosts"
      />
    </section>

    <div v-if="!weiboArr.length && !isLoading">
      暂无微博
    </div>
  </main>
</template>

<style scoped>

</style>
