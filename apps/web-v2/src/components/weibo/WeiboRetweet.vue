<script setup lang="ts">
import type { Post } from '@workspace/shared'
import { computed } from 'vue'
import WeiboActions from './WeiboActions.vue'
import WeiboCard from './WeiboCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import WeiboText from './WeiboText.vue'

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
  <div class="weibo-card bg-white rounded-2xl shadow-sm p-5 group">
    <WeiboProfile
      v-if="post.user"
      :user="post.user"
      :meta="post"
    />
    <WeiboText :text="post.text" />
    <WeiboCard :post="post.retweeted_status!" is-retweet />
    <WeiboActions
      class="mt-4"
      :actions="actions"
    />
  </div>
</template>
