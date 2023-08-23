<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const text = fetchLongText(props.post)
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-2 bg-white p-3"
  >
    <div class="flex justify-between">
      <profile :user="post.user" />
      <post-meta :post="post" />
    </div>

    <main>
      <p class="whitespace-pre-wrap text-4" v-html="text" />
      <gallery :imgs="post.imgs" />
      <slot />
    </main>

    <post-action class="justify-start!" :post="post" />
  </article>
</template>
