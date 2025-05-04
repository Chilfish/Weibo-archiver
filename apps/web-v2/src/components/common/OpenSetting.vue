<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Settings } from 'lucide-vue-next'
import Setting from '../settings/Settings.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button
        class="btn btn-ghost btn-sm rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500"
      >
        <Settings class="h-4 w-4" />
        <span>设置</span>
      </button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-fit"
      :show-close="false"
    >
      <Setting />
    </DialogContent>
  </Dialog>
</template>
