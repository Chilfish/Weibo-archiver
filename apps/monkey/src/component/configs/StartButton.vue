<script setup lang="ts">
import { config } from '@/composables/useConfig'
import { fetchState, startFetch } from '@/composables/useFetch'
import { usePost } from '@/composables/usePost'
import { Download } from 'lucide-vue-next'
import { computed } from 'vue'

const postStore = usePost()

const buttonText = computed(() => {
  const name = config.value.user?.name || '未设置'
  const type = config.value.isFetchAll ? '全部' : '部分'
  const statusText = fetchState.status === 'idle' ? '开始' : '正在'

  if (fetchState.status === 'finish') {
    return `已完成，导出中`
  }

  return `${statusText}获取 @${name} 的${type}微博`
})

async function handleStartExport() {
  if (fetchState.status === 'running') {
    return
  }
  await startFetch()
  await postStore.exportAllData()

  fetchState.status = 'idle'
}
</script>

<template>
  <div
    class="mt-4 flex flex-col gap-2"
  >
    <button
      class="btn btn-primary"
      @click="handleStartExport"
    >
      <Download
        v-if="fetchState.status === 'idle'"
        class="mr-2 h-5 w-5"
      />
      <span
        v-if="fetchState.status === 'running'"
        class="loading loading-spinner loading-sm"
      />
      <span>{{ buttonText }}</span>
    </button>

    <button
      class="btn btn-outline"
      @click="postStore.exportAllData()"
    >
      直接导出缓存数据
    </button>
  </div>
</template>
