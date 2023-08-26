<script setup lang="ts">
import type { Comment } from '@core/types'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div class="flex flex-col b-t">
    <article
      v-for="comment in comments"
      :key="comment.id"
      class="flex flex-col gap-1 rounded-2 bg-white p-3 pl-10"
    >
      <profile :user="comment.user" class="ml-[-2.5rem]" />
      <post-text :text="comment.text" />
      <div class="flex gap-3 text-3 text-gray">
        <post-meta :meta="comment" class="justify-start!" />
        <span>
          评论 {{ comment.comments_count }} |
          点赞 {{ comment.like_count }}
        </span>
      </div>
    </article>
  </div>
</template>
