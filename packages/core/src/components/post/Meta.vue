<script setup lang="ts">
import type { Meta } from '@core/types'

const props = defineProps<{
  meta: Meta
}>()

const date = useDateFormat(props.meta.created_at, 'YY-MM-DD HH:mm dddd')
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-end gap-1 text-3 text-gray sm:gap-3"
  >
    <el-link
      :underline="false"
      :href="meta.detail_url"
      target="_blank"
      class="text-3! text-gray-400! hover:text-gray-600!"
    >
      {{ date }}
    </el-link>

    <span> {{ meta.region_name }} </span>

    <span v-if="meta.source" class="hidden sm:inline">
      来自 <span v-html="meta.source" />
    </span>
  </div>
</template>
