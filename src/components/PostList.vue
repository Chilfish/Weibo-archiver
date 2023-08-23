<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  list: Post[]
}>()
</script>

<template>
  <div>
    <post-item
      v-for="item in list"
      :key="item.id"
      :post="item"
    />
  </div>
</template>
