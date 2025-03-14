<script setup lang="ts">
import { Download, Pause, Play, RotateCw } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { fetchState, useFetch } from '../composables/useFetch'
import { usePost } from '../composables/usePost'
import ProgressBar from './ProgressBar.vue'
import StatusBadge from './StatusBadge.vue'

// State machine for export process: idle -> running -> paused -> completed
type ExportState = 'idle' | 'running' | 'paused' | 'completed'

const exportState = ref<ExportState>('idle')
const { startFetch, toggleStop, startButtonText } = useFetch()
const { exportAllData } = usePost()

// Main export button text based on state
const mainButtonText = computed(() => {
  switch (exportState.value) {
    case 'idle':
      return startButtonText.value
    case 'running':
      return '获取微博中...'
    case 'paused':
      return '继续获取微博'
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
    case 'paused':
      return `${baseClass} continue`
    case 'completed':
      return `${baseClass} bg-blue-500`
    default:
      return baseClass
  }
})

// Icon for the main button based on state
const mainButtonIcon = computed(() => {
  switch (exportState.value) {
    case 'idle':
      return Download
    case 'running':
      return Download
    case 'paused':
      return Play
    case 'completed':
      return Download
    default:
      return Download
  }
})

// Whether to show the secondary actions (pause and reset buttons)
const showSecondaryActions = computed(() =>
  exportState.value === 'running' || exportState.value === 'paused',
)

// Whether to show the immediate export button (during paused state)
const showExportNowButton = computed(() =>
  exportState.value === 'paused',
)

// Start the export process
async function handleStartExport() {
  switch (exportState.value) {
    case 'idle':
      exportState.value = 'running'
      await startFetch()
      break
    case 'paused':
      exportState.value = 'running'
      toggleStop() // Resume the export
      break
    case 'completed':
      // Just trigger the download without starting a new export
      await exportAllData()
      exportState.value = 'idle'
      break
  }
}

// Pause the export process
function handlePauseExport() {
  if (exportState.value === 'running') {
    exportState.value = 'paused'
    toggleStop()
  }
  else if (exportState.value === 'paused') {
    exportState.value = 'running'
    toggleStop()
  }
}

// Reset the export process
function handleResetExport() {
  // Confirm before resetting
  if (confirm('确定要重新开始导出吗？已获取的数据将被丢弃。')) {
    exportState.value = 'idle'
    // If it was stopped, toggle it back
    if (fetchState.isStop) {
      toggleStop()
    }
    // Reset any other state as needed
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
    :show-export-now="showExportNowButton"
    @export-now="handleExportNow"
  />

  <div
    class="flex flex-col space-y-2"
  >
    <button
      :class="mainButtonClass"
      @click="handleStartExport"
    >
      <component
        :is="mainButtonIcon"
        class="mr-2 h-5 w-5"
      />
      <span>{{ mainButtonText }}</span>
    </button>

    <div
      v-if="showSecondaryActions"
      class="grid grid-cols-2 gap-2"
    >
      <button
        class="btn"
        @click="handlePauseExport"
      >
        <component
          :is="exportState === 'paused' ? Play : Pause"
          class="mr-1 h-4 w-4"
        />
        {{ exportState === 'paused' ? '继续' : '暂停' }}
      </button>

      <button
        class="btn"
        @click="handleResetExport"
      >
        <RotateCw class="mr-1 h-4 w-4" />
        从头开始
      </button>
    </div>
  </div>
</template>
