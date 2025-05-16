<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import WeiboActions from '@/components/weibo/WeiboActions.vue'
import WeiboComments from '@/components/weibo/WeiboComments.vue'
import WeiboProfile from '@/components/weibo/WeiboProfile.vue'
import WeiboText from '@/components/weibo/WeiboText'
import { computed } from 'vue'

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
  <div
    class="bg-card flex flex-col p-4 rounded-xl"
  >
    <WeiboProfile :meta="post" />
    <WeiboText :text="post.text" />
    <WeiboActions :actions="actions" />
    <WeiboComments :comments="post.comments" />
  </div>
</template>
