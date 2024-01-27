<script setup lang="ts">
import type { CardInfo, Retweet } from '@weibo-archiver/core'

defineProps<{
  post: Retweet
  card?: CardInfo
}>()
</script>

<template>
  <article class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3 dark:bg-dark">
    <profile
      v-if="post.user"
      :user="post.user"
    />
    <main>
      <post-text
        :text="post.text"
        :class="post.user ? '' : 'text-red-7!'"
      />

      <gallery :imgs="post.imgs" />

      <post-card
        v-if="card"
        :card="card"
      />
    </main>
    <div
      v-if="post.user"
      class="flex justify-between text-gray"
    >
      <post-meta :meta="post" />
    </div>
  </article>
</template>
