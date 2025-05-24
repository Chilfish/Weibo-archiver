<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, scrollToTop } from '@weibo-archiver/core'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onMessage, sendMessage } from 'webext-bridge/window'
import Pagination from '@/components/common/Pagination.vue'
import DialogSyncedCount from '@/components/home/DialogSyncedCount.vue'
import EmptyWeibo from '@/components/home/EmptyWeibo.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
import Weibo from '@/components/weibo/Weibo.vue'
import { config } from '@/composables'
import { usePostStore, useUserStore } from '@/stores'

const postStore = usePostStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)
const newestPostDate = ref(Date.now())

const weiboArr = ref<Post[]>([])

onBeforeMount(async () => {
  if (!route.query.page) {
    await router.push({
      query: {
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    })
  }
  await getPosts()
  postsTotal.value = await postStore.getAllPostsTotal()
  newestPostDate.value = await postStore.getNewestPostDate()
})

watch(() => postStore.importing, async (importing) => {
  if (importing === false) {
    await getPosts()
    postsTotal.value = await postStore.getAllPostsTotal()
    newestPostDate.value = await postStore.getNewestPostDate()
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
      pageSize: pageSize.value,
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
      page: newPage,
      pageSize: newPageSize,
    },
  })
  await getPosts()
  scrollToTop()
}

const syncedCount = ref(0)
const newPostsCount = ref(0)
const openDialog = ref(false)
async function onManualSync() {
  isLoading.value = true
  openDialog.value = true
  const posts = await sendMessage<Post[]>('fetch:posts', {
    uid: userStore.curUid,
    newestPostDate: newestPostDate.value,
  })

  const firstPagePosts = await postStore.getPosts(1, 20)
  const newPosts = posts.filter(fetchedPost => !firstPagePosts.some(post => post.id === fetchedPost.id))
  newPostsCount.value = newPosts.length

  await postStore.saveWeibo(posts)
  await getPosts()

  config.value.syncTime.weibo = Date.now()
  isLoading.value = false
}

onMessage<number>('state:fetch-count', async ({ data }) => {
  syncedCount.value = data || 0
})
</script>

<template>
  <DialogSyncedCount
    v-model:open-dialog="openDialog"
    :synced-count="syncedCount"
    :new-posts-cont="newPostsCount"
    :is-loading="isLoading"
  />

  <main
    class="flex flex-col gap-4 items-center relative w-full"
  >
    <HomeHeader
      v-if="postsTotal > 1"
      :last-sync-time="new Date(config.syncTime.weibo)"
      :is-loading="isLoading"
      :total-posts="postsTotal"
      @sort-change="console.log"
      @manual-sync="onManualSync"
    />

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
