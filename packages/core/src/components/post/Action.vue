<script setup lang="ts">
import type { Post } from '@core/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="icons my-1 flex select-none justify-between px-4 sm:justify-center sm:gap-30">
    <span>
      <span class="icon i-tabler-share-3" />
      <span>{{ post.reposts_count }}</span>
    </span>

    <span>
      <span class="icon i-tabler-message" />
      <span>{{ post.comments_count }}</span>
    </span>

    <span>
      <span class="icon i-tabler-heart" />
      <span>{{ post.attitudes_count }}</span>
    </span>
  </div>
</template>
