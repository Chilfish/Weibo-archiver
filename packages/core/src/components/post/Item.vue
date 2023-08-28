<script setup lang="ts">
import type { Post } from '@core/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-2 bg-white p-4 shadow-xl dark:bg-dark"
  >
    <div class="flex justify-between">
      <profile :user="post.user" />
      <post-meta :meta="post" />
    </div>

    <main>
      <post-text :text="post.text" />
      <gallery :imgs="post.imgs" />
      <post-card
        v-if="post.card && !post.retweeted_status"
        :card="post.card"
      />
      <slot />
    </main>

    <post-action
      class="justify-start!"
      :post="post"
    />

    <post-comments
      v-if="post.comments_count > 0"
      :comments="post.comments"
    />
  </article>
</template>
