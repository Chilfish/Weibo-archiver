<script setup lang="ts">
import { preview } from '~/utils'

const postStore = usePostStore()
const curPage = ref(postStore.curPage)
const posts = computed(() => postStore.get())
const isFinish = ref(true)

watch(curPage, async (newPage) => {
  // 到新页面才加载
  if (newPage > postStore.fetchedPage) {
    isFinish.value = false
    const res = await fetchPosts(curPage.value)
    postStore.add(res!.list)
    isFinish.value = true
  }
  postStore.setCurPage(newPage)

  await preview()
})
</script>

<template>
  <div
    id="preview"
    class="min-h-screen w-full flex flex-col items-center justify-center bg-light-700 py-4"
  >
    <Suspense>
      <post-list :posts="posts" />
    </Suspense>

    <div class="mt-4 select-none">
      <div class="btns mb-4 flex justify-center gap-4">
        <button
          :disabled="curPage === 1 || !isFinish"
          @click="curPage--"
        >
          上一页
        </button>

        <button
          :disabled="curPage === postStore.pages || !postStore.fetchedPage
            || !isFinish"
          @click="curPage++"
        >
          下一页
        </button>
      </div>

      <div>
        第 {{ curPage }} 页，已经获取了 {{ postStore.fetchedPage }} 页，
        共 {{ postStore.pages }} 页、{{ postStore.total }} 条微博
      </div>
    </div>
  </div>
</template>
