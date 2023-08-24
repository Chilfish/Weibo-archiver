<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const text = await fetchLongText(props.post)
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
      <p class="whitespace-pre-wrap break-all text-4 text-black" v-html="text" />
      <gallery :imgs="post.imgs" />
      <slot />
    </main>

    <post-action class="justify-start!" :post="post" />
  </article>
</template>
