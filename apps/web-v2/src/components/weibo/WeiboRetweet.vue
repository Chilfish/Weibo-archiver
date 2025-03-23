<script setup lang="ts">
import type { Post } from '@workspace/shared'
import { computed } from 'vue'
import WeiboActions from './WeiboActions.vue'
import WeiboCard from './WeiboCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import { WeiboText } from './WeiboText'

const props = defineProps<{
  post: Post
}>()

const actions = computed(() => ({
  likes: props.post.like_count,
  reposts: props.post.reposts_count,
  comments: props.post.comments_count,
}))
</script>

<template>
  <div class="weibo-card bg-base-100 rounded-2xl shadow-sm p-5 group">
    <WeiboProfile
      :meta="post"
    />
    <WeiboText :text="post.text" />
    <WeiboCard
      :post="post.retweeted_status!"
      :link-card="post.card"
      class="bg-base-200 pb-1"
      is-retweet
    />
    <WeiboActions
      class="mt-4"
      :actions="actions"
    />
  </div>
</template>
