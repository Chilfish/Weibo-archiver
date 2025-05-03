<script setup lang="ts">
import { useConfig } from '../composables/useConfig'
import { usePost } from '../composables/usePost'

defineProps<{
  status: 'idle' | 'running' | 'paused' | 'completed'
}>()

const { config } = useConfig()
const { progress } = usePost()
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
    </div>
  </div>
</template>
