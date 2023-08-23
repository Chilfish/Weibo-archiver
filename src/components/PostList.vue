<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  list: Post[]
}>()
</script>

<template>
  <div class="m-auto flex flex-col gap-4 rounded bg-light-700 px-2 py-4 sm:max-w-45rem">
    <post-item
      v-for="item in list"
      :key="item.id"
      :post="item"
    />
  </div>
</template>
