<script setup lang="ts">
import type { CardInfo, Post } from '@workspace/shared'
import { computed, ref } from 'vue'
import ImageGallery from '../common/ImageGallery.vue'
import WeiboActions from './WeiboActions.vue'
import WeiboComments from './WeiboComments.vue'
import WeiboLinkCard from './WeiboLinkCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import { WeiboText } from './WeiboText'

const props = defineProps<{
  post: Post
  linkCard?: CardInfo
  isRetweet?: boolean
}>()

const actions = computed(() => ({
  likes: props.post.like_count,
  reposts: props.post.reposts_count,
  comments: props.post.comments_count,
}))

// 合并转发中的卡片，油猴脚本那边解析错了
const linkCard = computed(() => {
  return props.post.card || props.linkCard
})

const isCommentsOpen = ref(false)
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
    <WeiboLinkCard v-if="linkCard" :card="linkCard" />
    <WeiboActions
      v-if="!isRetweet"
      :actions="actions"
      @click-comment="isCommentsOpen = !isCommentsOpen"
    />

    <div
      v-if="post.comments.length"
      class="collapse" :class="[isCommentsOpen ? 'collapse-open' : 'h-0']"
    >
      <input type="checkbox ">
      <div class="collapse-content p-0!">
        <WeiboComments
          :comments="post.comments"
        />
      </div>
    </div>
  </div>
</template>

<style>
.weibo-card {
  transition: all 0.25s ease;
}
</style>
