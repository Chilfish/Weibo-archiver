<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useConfig } from '../composables/useConfig'
import { usePost } from '../composables/usePost'

defineProps<{
  status: 'idle' | 'running' | 'paused' | 'completed'
  showExportNow?: boolean
}>()

const emit = defineEmits(['exportNow'])
const { config } = useConfig()
const { progress } = usePost()

function handleExportNow() {
  emit('exportNow')
}
</script>

<template>
  <div
    v-if="status !== 'idle'"
    class="py-2"
  >
    <label
      class="flex pb-4"
    >
      导出进度
      <span
        class="ml-auto"
      >
        {{ progress.fetchedCount }}/{{ config.total || '?' }}
      </span>
    </label>

    <div
      class="card gap-4"
    >
      <progress
        class="progress"
        :value="progress.percentage"
        :max="100"
      />

      <button
        v-if="showExportNow"
        class="btn-neutral w-full btn"
        @click="handleExportNow"
      >
        <ArrowRight class="mr-2" />
        立即导出已获取的数据
      </button>
    </div>
  </div>
</template>
