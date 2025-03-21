<script setup lang="ts">
import type { Post } from '@workspace/shared'
import { computed } from 'vue'
import ImageGallery from '../common/ImageGallery.vue'
import WeiboActions from './WeiboActions.vue'
import WeiboLinkCard from './WeiboLinkCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import WeiboText from './WeiboText.vue'

const props = defineProps<{
  post: Post
  isRetweet?: boolean
}>()

const actions = computed(() => ({
  likes: props.post.like_count,
  reposts: props.post.reposts_count,
  comments: props.post.comments_count,
}))
</script>

<template>
  <div
    class="weibo-card bg-base-100 rounded-2xl shadow-sm p-5 group"
  >
    <WeiboProfile
      :meta="post"
      :user="isRetweet ? post.user : undefined"
    />
    <WeiboText :text="post.text" />
    <ImageGallery
      class="pr-12"
      :images="post.imgs"
    />
    <WeiboLinkCard v-if="post.card" :card="post.card" />
    <WeiboActions v-if="!isRetweet" :actions="actions" />
  </div>
</template>

<style>
.weibo-card {
  transition: all 0.25s ease;
}
</style>
