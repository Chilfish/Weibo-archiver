<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { config } from '../../composables/useConfig'

const emits = defineEmits<{
  start: []
}>()

type Status = 'idle' | 'running' | 'completed'

const status = ref<Status>('idle')

const buttonText = computed(() => {
  const name = config.value.user?.name || '未设置'
  const type = config.value.isFetchAll ? '全部' : '部分'
  const statusText = status.value === 'idle' ? '开始' : '正在'

  return `${statusText}获取 @${name} 的${type}微博`
})

async function handleStartExport() {
  if (status.value === 'running') {
    return
  }

  status.value = 'running'
  emits('start')
  // await startFetch()
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
    <span>{{ buttonText }}</span>
  </button>
</template>
