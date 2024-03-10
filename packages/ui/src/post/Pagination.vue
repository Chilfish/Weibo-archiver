<script setup lang="ts">
const postStore = usePostStore()

const { curPage, pageSize } = usePagination(
  () => postStore.pages,
)

// watchImmediate([curPage, pageSize])

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
  <div class="center flex-wrap gap-4">
    <n-pagination
      v-model:page="curPage"
      v-model:page-size="pageSize"
      class="center flex-wrap"
      show-quick-jumper
      show-size-picker
      :page-sizes="[10, 20, 30]"
      :item-count="postStore.total"
      @update:page-size="fixPagePanel"
    />

    <div>
      共 {{ postStore.total }} 条
    </div>
  </div>
</template>
