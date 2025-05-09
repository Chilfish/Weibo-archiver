<script setup lang="ts">
import type { SearchQuery } from '@/composables'
import type { Post } from '@weibo-archiver/core'
import Pagination from '@/components/common/Pagination.vue'
import SearchBar from '@/components/SearchBar.vue'
import Weibo from '@/components/weibo/Weibo.vue'
import { usePostStore } from '@/stores'
import { DEFAULT_PAGE_SIZE } from '@weibo-archiver/core'
import { ref } from 'vue'

const postStore = usePostStore()

const isLoading = ref(false)
const curPage = ref(1)
const pageSize = ref(DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)

const weiboArr = ref<Post[]>([])

async function searchPosts(query: SearchQuery) {
  console.log(query)
  weiboArr.value = await postStore.searchPosts(query)
}
</script>

<template>
  <main
    class="flex flex-col items-center w-full gap-6"
  >
    <SearchBar @search="searchPosts" />

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
      />
    </section>

    <div v-if="!weiboArr.length && !isLoading">
      暂无微博
    </div>
  </main>
</template>

<style scoped>

</style>
