<script setup lang="ts">
import type { CardInfo, Post } from '@core/types'

defineProps<{
  post: Post
  card?: CardInfo
}>()
</script>

<template>
  <article class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3">
    <profile v-if="post.user" :user="post.user" />
    <main>
      <p
        class="whitespace-pre-wrap break-all text-4"
        :class="!!(post.user) ? 'text-black' : 'text-orange'"
        v-html="post.text"
      />
      <gallery :imgs="post.imgs" />
      <post-card v-if="card" :card="card" />
    </main>
    <div class="flex justify-between text-gray">
      <post-meta :post="post" />
    </div>
  </article>
</template>
