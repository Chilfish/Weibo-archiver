<script setup lang="tsx">
import type { ImportedData } from '@weibo-archiver/core'
import { onBeforeMount, ref, toRaw } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePostStore, useUserStore } from '@/stores'
import ImportDataPreview from './ImportDataPreview'

const { parseImport, saveImportedData } = usePostStore()
const userStore = useUserStore()

const isProcessing = ref(false)
const data = ref<ImportedData>()
const selectedUid = ref('')
const openDialog = ref(false)

onBeforeMount(async () => {
  // data.value = await fetch('/weibo-data-Chilfish_.json').then(res => res.json())

})

async function loadImportedData(e: Event) {
  data.value = await parseImport(e)
  openDialog.value = true
}

async function processImport() {
  if (!data.value) {
    return
  }

  console.log('[import data] selected uid', selectedUid.value)

  isProcessing.value = true
  if (!selectedUid.value) {
    await saveImportedData(toRaw(data.value))
    isProcessing.value = false
    openDialog.value = false
    return
  }

  data.value.weibo.forEach((item) => {
    item.userId = selectedUid.value
  })
  const users = await userStore.getAllUsers()
  const selectedUser = users.find(user => user.uid === selectedUid.value)
  if (selectedUser) {
    data.value.user = selectedUser
  }

  await saveImportedData(toRaw(data.value))

  isProcessing.value = false
  openDialog.value = false
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
    :open="openDialog"
  >
    <DialogScrollContent :show-close="false">
      <DialogHeader>
        <DialogTitle>
          确认导入数据
        </DialogTitle>
      </DialogHeader>

      <ImportDataPreview
        v-if="data"
        :data="data"
        :is-processing="isProcessing"
        @selected-uid="uid => selectedUid = uid"
      />

      <DialogFooter
        class="flex items-center justify-end gap-3 p-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        <Button
          variant="outline"
          :disabled="isProcessing"
          @click="openDialog = false"
        >
          取消
        </Button>
        <Button
          :disabled="isProcessing"
          @click="processImport"
        >
          {{
            isProcessing ? '处理中...' : '确认导入'
          }}
        </Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
