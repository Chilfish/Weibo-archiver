<script setup lang="ts">
import type { Post } from '@workspace/shared'
import WeiboCard from './WeiboCard.vue'
import WeiboRetweet from './WeiboRetweet.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <WeiboCard
    v-if="!post.retweeted_status"
    :post="post"
  />
  <WeiboRetweet
    v-else
    :post="post"
  />
</template>
