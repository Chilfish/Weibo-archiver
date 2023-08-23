<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="my-4">
    {{ post.text_raw }}
  </article>
</template>
