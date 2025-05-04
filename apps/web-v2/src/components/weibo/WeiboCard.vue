<script setup lang="ts">
import type { CardInfo, Post } from '@weibo-archiver/shared'
import { Card, CardContent } from '@/components/ui/card'
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
  <Card
    as="article"
    class="group"
  >
    <CardContent>
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
        class="collapse" :class="[
          isCommentsOpen ? 'collapse-open' : 'collapse-close',
        ]"
      >
        <input type="checkbox" class="hidden">
        <div class="collapse-content pt-3 pb-0! px-0">
          <WeiboComments
            :comments="post.comments"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style>

</style>
