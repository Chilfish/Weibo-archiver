<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import Pagination from '@/components/common/Pagination.vue'
import EmptyWeibo from '@/components/EmptyWeibo.vue'
import Weibo from '@/components/weibo/Weibo.vue'
import { usePostStore, useUserStore } from '@/stores'
import { DEFAULT_PAGE_SIZE } from '@weibo-archiver/core'
import { onBeforeMount, ref, useTemplateRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const postStore = usePostStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)

const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  await getPosts()
  postsTotal.value = await postStore.getAllTotal()
})

watch(() => postStore.importing, async (importing) => {
  if (importing === false) {
    await getPosts()
    postsTotal.value = await postStore.getAllTotal()
  }
})

watch([
  () => userStore.curUid,
  () => route.query,
], async ([curUid, query], [oldUid, oldQuery]) => {
  if (query.page && oldQuery.page && curUid === oldUid) {
    return
  }
  isLoading.value = true
  await userStore.setCurUid(curUid)

  curPage.value = 1
  await router.push({
    query: {
      page: 1,
    },
  })

  await getPosts()
  scrollToTop()
})

async function getPosts() {
  isLoading.value = true
  weiboArr.value = await postStore.getPosts(curPage.value, pageSize.value)
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

const mainRef = useTemplateRef<HTMLElement>('mainRef')
function scrollToTop() {
  mainRef.value!.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <main
    ref="mainRef"
    class="flex flex-col relative w-full"
  >
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

    <EmptyWeibo v-if="!weiboArr.length && !isLoading" />
  </main>
</template>
