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

    <n-pagination
      v-model:page="curPage"
      v-model:page-size="postStore.postsPerPage"
      show-quick-jumper
      show-size-picker
      :page-sizes="[20, 30, 50, 100]"
      :page-count="postStore.total"

      @current-change="$emit('update:page', $event)"
    />
  </div>
</template>
