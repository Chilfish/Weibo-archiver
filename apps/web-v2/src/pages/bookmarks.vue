<script setup lang="ts">
import type { Favorite, Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, scrollToTop } from '@weibo-archiver/core'
import { Loader2Icon } from 'lucide-vue-next'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { onMessage } from 'webext-bridge/window'
import BookmarkMigrationDialog
  from '@/components/bookmarks/BookmarkMigrationDialog.vue'
import Pagination from '@/components/common/Pagination.vue'
import { Button } from '@/components/ui/button'
import Weibo from '@/components/weibo/Weibo.vue'
import { windowClient } from '@/composables'
import { usePostStore, useUserStore } from '@/stores'

const postStore = usePostStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const isSyncing = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const postsTotal = ref(0)

const weiboArr = ref<Favorite[]>([])

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

async function syncData() {
  isSyncing.value = true
  const data = await windowClient.fetchFavorites({ uid: userStore.curUid }) as Favorite[]
  toast.success('获取收藏微博成功', {
    description: `已获取到共 ${data.length} 条微博`,
    action: {
      label: '保存',
      onClick: async () => {
        postStore.saveFavorites(data)
        weiboArr.value = await postStore.getFavorites(curPage.value, pageSize.value)
      },
    },
    duration: 1000 * 60,
  })
  isSyncing.value = false
}

onMessage('fetch:favorites-paged', () => {})
</script>

<template>
  <main
    class="flex flex-col relative w-full"
  >
    <BookmarkMigrationDialog />

    <header
      class="flex items-center justify-between"
    >
      <h2
        class="text-xl font-bold mb-4"
      >
        微博收藏
      </h2>

      <Button
        variant="outline"
        size="sm"
        @click="syncData"
      >
        <Loader2Icon
          v-if="isSyncing"
          class="w-4 h-4 mr-2 animate-spin"
        />
        同步
      </Button>
    </header>

    <section
      v-if="weiboArr.length > 0"
      class="flex flex-col items-center max-w-[90vw] md:max-w-[70vw] mx-auto gap-4 lg:px-12"
    >
      <Weibo
        v-for="post in weiboArr"
        :key="post.id"
        :post="post as unknown as Post"
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
