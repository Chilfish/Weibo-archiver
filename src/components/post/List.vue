<script setup lang="ts">
import { preview } from '~/utils'

const postStore = usePostStore()
const curPage = ref(postStore.curPage)
const posts = computed(() => postStore.get())
const isFinished = ref(true)

watch(curPage, async (newPage, _) => {
  isFinished.value = false
  // 到新页面才加载
  if (newPage > postStore.viewedPage)
    await fetchPosts(curPage.value)

  postStore.setPage(newPage)
  preview()
  isFinished.value = true
})
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center bg-light-700 py-8">
    <div class="m-auto flex flex-col gap-4 rounded px-8 sm:max-w-55rem">
      <Suspense>
        <post-item
          v-for="item in posts"
          :key="item.id"
          :post="item"
        >
          <Suspense>
            <post-retweeted
              v-if="item.retweeted_status"
              :post="item.retweeted_status"
            />
          </Suspense>
        </post-item>
      </Suspense>
    </div>

    <div class="btns mt-4 flex select-none items-center gap-4">
      <button
        :disabled="curPage === 1 || !isFinished"
        @click="curPage--"
      >
        上一页
      </button>

      <button
        :disabled="curPage === postStore.pages || !isFinished"
        @click="curPage++"
      >
        下一页
      </button>

      <span>第 {{ curPage }} 页, 共 {{ postStore.pages }} 页, {{ postStore.total }} 条</span>
    </div>
  </div>
</template>
