<script setup lang="ts">
const props = defineProps({
  page: Number,
  pageSize: Number,
})

defineEmits({
  'update:page': (page: number) => page,
  'update:page-size': (pageSize: number) => pageSize,
})

const postStore = usePostStore()
const curPage = ref(props.page || postStore.curPage)
const pageSize = ref(props.pageSize || postStore.postsPerPage)

const posts = computed(() => postStore.get())

const { y } = useWindowScroll({
  behavior: 'smooth',
})
function scrollToTop() {
  y.value = 0
}

watch(curPage, (newPage) => {
  postStore.curPage = newPage
})

// 切换分页大小后可能会有大片的空白区域，再次点击就能清掉
const pagePanel = ref<HTMLElement | null>(null)

async function fixPagePanel() {
  pagePanel.value?.click()
  await delay(500)
  pagePanel.value?.click()
}

onMounted(async () => {
  pagePanel.value = await waitForElement('.n-base-selection-label')
})
</script>

<template>
  <div
    id="preview"
    class="flex flex-col items-center bg-light-700 pb-4 dark:bg-dark-700"
  >
    <post-list :posts="posts" />

    <n-pagination
      v-model:page="curPage"
      v-model:page-size="pageSize"
      show-quick-jumper
      show-size-picker
      :page-sizes="[20, 30, 50, 100]"
      :item-count="postStore.total"

      @update:page-size="async (pageSize) => {
        $emit('update:page-size', pageSize)
        await fixPagePanel()
      }"
      @update:page="(page) => {
        $emit('update:page', page)
        scrollToTop()
      }"
    />
  </div>
</template>
