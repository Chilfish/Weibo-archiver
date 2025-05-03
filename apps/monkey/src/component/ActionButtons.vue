<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { config } from '../composables/useConfig'
import { fetchState, startFetch } from '../composables/useFetch'
import { usePost } from '../composables/usePost'
import ProgressBar from './ProgressBar.vue'
import StatusBadge from './StatusBadge.vue'

// State machine for export process: idle -> running -> paused -> completed
type ExportState = 'idle' | 'running' | 'completed'

const exportState = ref<ExportState>('idle')
const { exportAllData } = usePost()

const startButtonText = computed(() => {
  const user = config.value?.user?.name || '【未设置用户】'
  if (config.value.followingsOnly)
    return `获取 ${user} 的关注列表`

  return `开始获取 @${user} 的${config.value.isFetchAll ? '全部' : '部分'}微博`
})

const mainButtonText = computed(() => {
  switch (exportState.value) {
    case 'idle':
      return startButtonText.value
    case 'running':
      return '获取微博中...'
    case 'completed':
      return '导出已获取的数据'
    default:
      return '开始获取微博'
  }
})

// Style classes for the main button based on state
const mainButtonClass = computed(() => {
  const baseClass = 'w-full py-3 font-medium text-center flex items-center justify-center btn btn-primary'

  switch (exportState.value) {
    case 'completed':
      return `${baseClass} bg-blue-500`
    default:
      return baseClass
  }
})

// Start the export process
async function handleStartExport() {
  switch (exportState.value) {
    case 'idle':
      exportState.value = 'running'
      await startFetch()
      break
    case 'completed':
      // Just trigger the download without starting a new export
      await exportAllData()
      exportState.value = 'idle'
      break
  }
}

// Handle immediate export during paused state
async function handleExportNow() {
  if (confirm('确定要导出已获取的数据吗？')) {
    await exportAllData()
  }
}

// Watch for fetch state changes
watch(() => fetchState.isFinish, (isFinish) => {
  if (isFinish) {
    exportState.value = 'completed'
  }
}, { immediate: true })
</script>

<template>
  <StatusBadge :status="exportState" />

  <ProgressBar
    :status="exportState"
    @export-now="handleExportNow"
  />

  <div
    class="flex flex-col space-y-2"
  >
    <button
      :class="mainButtonClass"
      @click="handleStartExport"
    >
      <Download
        class="mr-2 h-5 w-5"
      />
      <span>{{ mainButtonText }}</span>
    </button>
  </div>
</template>
