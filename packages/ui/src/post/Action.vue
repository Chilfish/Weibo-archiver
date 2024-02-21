<script setup lang="ts">
import type { Post } from '@types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="icons my-1 flex select-none justify-between gap-16 px-4 sm:justify-center sm:gap-30">
    <span>
      <span class="i-tabler-share-3 icon" />
      <span>{{ post.reposts_count }}</span>
    </span>

    <span>
      <span class="i-tabler-message icon" />
      <span>{{ post.comments_count }}</span>
    </span>

    <span>
      <span class="i-tabler-heart icon" />
      <span>{{ post.like_count }}</span>
    </span>
  </div>
</template>
