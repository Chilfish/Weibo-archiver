<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="flex items-center gap-2 p-3 border-b border-gray-200">
    <button
      class="btn btn-ghost btn-sm btn-circle"
      @click="$emit('close')"
    >
      <X class="w-4 h-4" />
    </button>
    <h2 class="text-lg font-medium text-gray-800">
      设置
    </h2>
  </div>
</template>
