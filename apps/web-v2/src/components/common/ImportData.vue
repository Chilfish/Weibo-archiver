<script setup lang="tsx">
import type { ImportedData } from '@weibo-archiver/core'
import { onBeforeMount, ref } from 'vue'
import { usePostStore } from '@/stores'
import ImportDataPreview from './ImportDataPreview'

const { parseImport, saveImportedData } = usePostStore()

const isProcessing = ref(false)
const data = ref<ImportedData>()
// const openDialog = computed(() => !!data.value?.user?.uid)
const openDialog = true

onBeforeMount(async () => {
  data.value = await fetch('/weibo-data-Chilfish_.json').then(res => res.json())
})

async function loadImportedData(e: Event) {
  data.value = await parseImport(e)
}
</script>

<template>
  <input
    type="file"
    accept=".json"
    class="absolute inset-0 opacity-0 w-full h-full"
    @change="loadImportedData"
  >

  <Dialog
    v-if="openDialog"
    :open="openDialog"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          确认导入数据
        </DialogTitle>
      </DialogHeader>

      <ImportDataPreview v-if="data" :data="data" />

      <DialogFooter
        class="flex items-center justify-end gap-3 p-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        <Button
          variant="outline"
          :disabled="isProcessing"
        >
          取消
        </Button>
        <Button
          :disabled="isProcessing"
        >
          {{
            isProcessing ? '处理中...' : '确认导入'
          }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
