<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import WeiboCard from './WeiboCard.vue'
import WeiboRetweet from './WeiboRetweet.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <WeiboCard
    v-if="!post.retweet"
    :post="post"
  />
  <WeiboRetweet
    v-else
    :post="post"
  />
</template>
