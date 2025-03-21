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
    <ImageGallery :images="post.imgs" />
    <WeiboLinkCard v-if="post.card" :card="post.card" />
    <WeiboActions :actions="actions" />
  </div>
</template>

<style>
.weibo-card {
  transition: all 0.25s ease;
}

/* 视频标识 */
.video-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
