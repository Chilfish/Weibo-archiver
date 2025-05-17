<script setup lang="tsx">
import type { Following } from '@weibo-archiver/core'
import { columns } from './dataColumns'
import DataTable from './DataTable.vue'

defineProps<{
  data: Following[]
}>()
</script>

<template>
  <div class="container py-4 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
