<script setup lang="ts">
import { computed } from 'vue'
import { usePost } from '../composables/usePost'

const props = defineProps<{
  status: 'idle' | 'running' | 'paused' | 'completed'
}>()

const { progress } = usePost()

const statusMessage = computed(() => {
  switch (props.status) {
    case 'running':
      return '正在导出数据...'
    case 'paused':
      return '导出已暂停'
    case 'completed':
      return '导出已完成'
    default:
      return ''
  }
})

const statusClass = computed(() => {
  switch (props.status) {
    case 'running':
      return 'status-active bg-success'
    case 'paused':
      return 'bg-warning'
    case 'completed':
      return 'bg-primary'
    default:
      return ''
  }
})
</script>

<template>
  <div
    v-if="status !== 'idle'"
    class="bg-base-100 flex items-center rounded-lg p-3"
  >
    <span
      class="status-indicator"
      :class="[statusClass]"
    />
    <span
      class="text-sm font-medium"
    >
      {{ statusMessage }}</span>

    <span
      class="ml-auto text-xs text-gray-500"
    >
      {{ Math.round(progress.percentage) }}%</span>
  </div>
</template>

<style scoped>
.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.status-active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(52, 199, 89, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0);
  }
}
</style>
