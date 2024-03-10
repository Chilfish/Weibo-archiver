<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { curPage, pageSize, total } = storeToRefs(usePostStore())
</script>

<template>
  <div class="center flex-wrap gap-4">
    <n-pagination
      v-model:page="curPage"
      v-model:page-size="pageSize"
      class="center flex-wrap"
      show-quick-jumper
      show-size-picker
      :page-sizes="[10, 20, 30]"
      :item-count="total"
    />

    <div>
      共 {{ total }} 条
    </div>
  </div>
</template>
