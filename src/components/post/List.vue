<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  list: Post[]
}>()
</script>

<template>
  <div class="m-auto flex flex-col gap-4 rounded bg-light-700 px-8 py-6 sm:max-w-55rem">
    <post-item
      v-for="item in list"
      :key="item.id"
      :post="item"
    >
      <post-retweeted
        v-if="item.retweeted_status"
        :post="item.retweeted_status"
      />
    </post-item>
  </div>
</template>
