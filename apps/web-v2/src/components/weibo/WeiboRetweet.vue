<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { computed } from 'vue'
import WeiboActions from './WeiboActions.vue'
import WeiboCard from './WeiboCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import { WeiboText } from './WeiboText'

const props = defineProps<{
  post: Post
}>()

const actions = computed(() => ({
  likes: props.post.likesCount,
  reposts: props.post.repostsCount,
  comments: props.post.commentsCount,
}))
</script>

<template>
  <Card
    as="article"
    class="group"
  >
    <CardContent>
      <WeiboProfile
        :meta="post"
      />
      <WeiboText :text="post.text" />
      <WeiboCard
        :post="post.retweet!"
        :link-card="post.card"
        class="bg-base-200 pb-1"
        is-retweet
      />
      <WeiboActions
        class="mt-4"
        :actions="actions"
      />
    </CardContent>
  </Card>
</template>
