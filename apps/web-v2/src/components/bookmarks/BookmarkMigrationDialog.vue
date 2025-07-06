<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const shouldShowDialog = useStorage('dialog:show:bookmark-migrate', true)
const openDialog = ref(shouldShowDialog.value)
</script>

<template>
  <Dialog
    v-model:open="openDialog"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          迁移须知
        </DialogTitle>
      </DialogHeader>
      <p
        class="indent-8"
      >
        由于旧版有 bug 导致查看的收藏不全，需要您升级油猴脚本或cli工具到版本 <code>v0.6.2</code> 以上后，再次导出当前所有的收藏后再导入。

        问题详见：<a
          href="https://github.com/Chilfish/Weibo-archiver/issues/101"
          target="_blank"
          class="text-primary underline underline-offset-4"
        >
          Github #101
        </a>
      </p>
      <DialogFooter>
        <div class="flex items-center space-x-2 mr-2">
          <Checkbox
            id="terms"
            @click="() => shouldShowDialog = false"
          />
          <label
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            不再提醒
          </label>
        </div>
        <DialogClose as-child>
          <Button>好的</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
