<script setup lang="ts">
const props = defineProps({
  page: Number,
})

defineEmits({
  'update:page': (page: number) => page,
})

const postStore = usePostStore()
const curPage = ref(props.page || postStore.curPage)
const posts = computed(() => postStore.get())

watch(curPage, (newPage) => {
  postStore.curPage = newPage
})
</script>

<template>
  <div
    id="preview"
    class="min-h-screen w-full flex flex-col items-center bg-light-700 pb-4 dark:bg-dark-700"
  >
    <Suspense>
      <post-list :posts="posts" />
    </Suspense>

    <el-pagination
      v-if="!isInMonkey"
      v-model:current-page="curPage"
      v-model:page-size="postStore.postsPerPage"
      class="flex flex-wrap items-center justify-center gap-4 px-2"
      layout="sizes, total, prev, pager, next, jumper"
      small
      background
      :default-page-size="20"
      :page-sizes="[20, 30, 50, 100]"
      :total="postStore.total"
      @current-change="$emit('update:page', $event)"
    />

    <!-- 在油猴获取数据的过程里，由于微博 api 的限制，必须线性地一步步翻页，不能跳转 -->
    <div
      v-else
      class="flex flex-col items-center justify-center"
    >
      <div class="btns mb-4 flex justify-center gap-4">
        <button
          :disabled="curPage === 1 || !postStore.fetchedPage"
          @click="curPage--"
        >
          上一页
        </button>

        <button
          :disabled="curPage === postStore.pages || !postStore.fetchedPage || curPage === postStore.fetchedPage"
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
