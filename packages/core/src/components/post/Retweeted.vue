<script setup lang="ts">
import type { CardInfo, Post } from '@core/types'

defineProps<{
  post: Post
  card?: CardInfo
}>()
</script>

<template>
  <article class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3">
    <profile v-if="post.user.id" :user="post.user" />
    <main>
      <post-text
        :text="post.text"
        :class="post.user.id ? '' : 'text-red-7!'"
      />
      <gallery :imgs="post.imgs" />
      <post-card v-if="card" :card="card" />
    </main>
    <div
      v-if="post.user.id"
      class="flex justify-between text-gray"
    >
      <post-meta :meta="post" />
    </div>
  </article>
</template>
