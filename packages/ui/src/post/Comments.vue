<script setup lang="ts">
import type { Comment } from '@types'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div class="flex flex-col pl-5">
    <article
      v-for="comment in comments"
      :key="comment.id"
      class="flex flex-col gap-2 rounded-2 bg-white p-3 pl-10 dark:bg-dark"
    >
      <div class="flex">
        <profile :user="comment.user" class="ml-[-2.5rem] mr-4!" />
        <div class="flex items-center gap-3 text-3 text-gray">
          <post-meta :meta="comment" class="justify-start!" />
          <span>
            评论 {{ comment.comments_count }} |
            点赞 {{ comment.like_count }}
          </span>
        </div>
      </div>

      <post-text :text="comment.text" />
    </article>
  </div>
</template>
