<script setup lang="ts">
import type { Post } from '@types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article
    :id="post.mblogid"
    class="post"
  >
    <div class="flex justify-between">
      <post-profile :user="post.user" />
      <post-meta
        :is-body="true"
        :meta="post"
      />
    </div>

    <main>
      <post-text :text="post.text" />
      <gallery :imgs="post.imgs" />
      <post-card
        v-if="post.card && !post.retweeted_status"
        :card="post.card"
      />

      <post-retweeted
        v-if="post.retweeted_status"
        :post="post.retweeted_status"
        :card="post.card"
      />
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

<style>
article.post {
  --uno: flex flex-col gap-2 rounded-2 bg-white p-4 shadow dark:bg-dark;
}

.post:hover .copy-id {
 opacity: 1 !important;
}
</style>
