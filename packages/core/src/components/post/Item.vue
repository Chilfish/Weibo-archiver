<script setup lang="ts">
import type { Post } from '@core/types'

defineProps<{
  post: Post
}>()
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
      <p
        class="whitespace-pre-wrap break-all text-4 text-black"
        v-html="post.text"
      />
      <gallery :imgs="post.imgs" />
      <post-card v-if="post.card && !post.retweeted_status" :card="post.card" />
      <slot />
    </main>

    <post-action class="justify-start!" :post="post" />
  </article>
</template>
