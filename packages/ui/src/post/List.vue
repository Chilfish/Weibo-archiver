<script setup lang="ts">
import type { Post } from '@types'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded px-2 py-8 md:w-60rem"
  >
    <post-item
      v-for="item in posts"
      :key="item.id"
      :post="item"
    >
      <post-retweeted
        v-if="item.retweeted_status"
        :post="item.retweeted_status"
        :card="item.card"
      />
    </post-item>

    <post-pagination />
  </div>
</template>
