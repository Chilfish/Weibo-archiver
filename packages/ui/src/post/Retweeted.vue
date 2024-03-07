<script setup lang="ts">
import type { CardInfo, Retweet } from '@types'

defineProps<{
  post: Retweet
  card?: CardInfo
}>()
</script>

<template>
  <article
    class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3 dark:bg-dark"
  >
    <post-profile
      v-if="post.user?.id"
      :user="post.user"
    />
    <main>
      <post-text
        :text="post.text"
        :class="post.user?.id ? '' : 'text-red!'"
      />

      <gallery :imgs="post.imgs" />

      <post-card
        v-if="card?.link"
        :card="card"
      />
    </main>
    <div
      v-if="post.user?.id"
      class="flex justify-between text-gray"
    >
      <post-meta :meta="post" />
    </div>
  </article>
</template>
