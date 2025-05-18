<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { config } from '../composables/useConfig'
import { usePost } from '../composables/usePost'

const emits = defineEmits<{
  start: []
}>()

type Status = 'idle' | 'running' | 'completed'

const status = ref<Status>('idle')
const { exportAllData } = usePost()

const mainButtonText = computed(() => {
  switch (status.value) {
    case 'idle':
      return `开始获取 @${config.value.user?.name} 的${config.value.isFetchAll ? '全部' : '部分'}微博`
    case 'running':
      return '获取微博中...'
    case 'completed':
      return '导出已获取的数据'
    default:
      return '开始获取微博'
  }
})

async function handleStartExport() {
  switch (status.value) {
    case 'idle':
      status.value = 'running'
      emits('start')
      // await startFetch()
      break
    case 'completed':
      await exportAllData()
      status.value = 'idle'
      break
  }
}
</script>

<template>
  <button
    class="mt-4 w-full flex items-center justify-center btn btn-primary"
    @click="handleStartExport"
  >
    <Download
      v-if="status === 'idle'"
      class="mr-2 h-5 w-5"
    />
    <span
      v-if="status === 'running'"
      class="loading loading-spinner loading-sm"
    />
    <span>{{ mainButtonText }}</span>
  </button>
</template>
