<script setup lang="ts">
const postStore = usePostStore()

const { curPage, pageSize } = toRefs(usePagination())

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
  <div>
    <n-pagination
      v-model:page="curPage"
      v-model:page-size="pageSize"
      show-quick-jumper
      show-size-picker
      :page-sizes="[20, 30, 50, 100]"
      :item-count="postStore.total"

      class="center flex-wrap"
      @update:page-size="fixPagePanel"
    />
  </div>
</template>
