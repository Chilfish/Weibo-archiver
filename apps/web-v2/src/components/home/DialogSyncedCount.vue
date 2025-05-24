<script setup lang="ts">
import { RefreshCwIcon } from 'lucide-vue-next'

defineProps<{
  isLoading: boolean
  syncedCount: number
  newPostsCont: number
}>()

const openDialog = defineModel<boolean>('openDialog', {
  default: false,
})
</script>

<template>
  <Dialog
    v-model:open="openDialog"
  >
    <DialogContent
      class="sm:w-72"
    >
      <DialogHeader>
        <DialogTitle
          class="flex items-center gap-2"
        >
          {{ isLoading ? '同步微博中' : '已完成同步' }}
          <RefreshCwIcon
            v-if="isLoading"
            class="h-4 w-4 animate-spin"
          />
        </DialogTitle>
      </DialogHeader>
      <main>
        <p>
          已获取了 {{ syncedCount }} 条微博
        </p>
        <p v-if="!isLoading">
          新增了 {{ newPostsCount }} 条微博
        </p>
      </main>

      <DialogFooter v-if="!isLoading">
        <DialogClose
          as-child
        >
          <Button>
            好的
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
