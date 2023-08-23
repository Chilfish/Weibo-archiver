<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const text = fetchLongText(props.post)
</script>

<template>
  <article class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3">
    <profile :user="post.user" />
    <main>
      <p class="whitespace-pre-wrap text-4" v-html="text" />
      <gallery :imgs="post.imgs" />
    </main>
    <div class="flex justify-between text-gray">
      <post-meta :post="post" />
    </div>
  </article>
</template>
