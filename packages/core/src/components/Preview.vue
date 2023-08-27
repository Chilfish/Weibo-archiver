<script setup lang="ts">
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
    class="min-h-screen w-full flex flex-col items-center justify-center bg-light-700 pb-4"
  >
    <Suspense>
      <post-list :posts="posts" />
    </Suspense>

    <el-pagination
      v-model:current-page="curPage"
      v-model:page-size="postStore.postsPerPage"
      layout="sizes, total, prev, pager, next, jumper"
      :default-page-size="20"
      :page-sizes="[20, 30, 50, 100]"
      :background="true"
      :total="postStore.total"
      @current-change="curPage = $event"
    />
  </div>
</template>
