<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { useIntersectionObserver } from '@vueuse/core'
import { onBeforeMount, ref, useTemplateRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AlbumPhotos from '@/components/album/AlbumPhotos.vue'
import AlbumPreview from '@/components/album/AlbumPreview.vue'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/stores'

const postStore = usePostStore()
const route = useRoute()
const router = useRouter()

const pageSize = 40

const weiboArr = ref<Post[]>([])
const isLoading = ref(false)
const noMore = ref(false)
const curPage = ref(Number(route.query.page) || 1)
const postsTotal = ref(0)

onBeforeMount(async () => {
  await getPosts()
  postsTotal.value = await postStore.getAllPostsTotal()
})

watch(() => route.query.page, async (newPage) => {
  if (!newPage) {
    curPage.value = 1
    weiboArr.value = []
    await getPosts()
  }
})

async function getPosts() {
  isLoading.value = true
  const posts = await postStore.getPosts(curPage.value, pageSize)
    .then(posts => posts.filter(post => post.imgs.length > 0))

  noMore.value = posts.length < 1

  weiboArr.value.push(...posts)
  isLoading.value = false
  return posts
}

async function loadingMore() {
  curPage.value += 1
  await router.push(({
    query: {
      page: curPage.value,
    },
  }))
  return await getPosts()
}

const loadMoreBtn = useTemplateRef('loadMoreBtn')
useIntersectionObserver(loadMoreBtn, ([{ isIntersecting }]) => {
  if (isIntersecting && !isLoading.value && !noMore.value) {
    loadingMore()
  }
})
</script>

<template>
  <div
    class="bg-card p-4 rounded-xl h-auto!"
  >
    <header
      class=" flex items-center justify-between"
    >
      <h2
        class="font-bold text-2xl mb-4"
      >
        微博相册
      </h2>
    </header>

    <main
      v-if="weiboArr.length > 0"
    >
      <AlbumPhotos :posts="weiboArr" />
      <AlbumPreview
        @next-page="async (cb) => {
          const newPosts = await loadingMore()
          cb(newPosts)
        }"
      />

      <Button
        v-if="!isLoading && !noMore"
        ref="loadMoreBtn"
        class="mt-4 mx-auto block"
        variant="outline"
        @click="loadingMore"
      >
        加载更多
      </Button>
    </main>

    <main
      v-else
      class="text-secondary-foreground text-center"
    >
      暂时还没发现微博里有图片
    </main>
  </div>
</template>
