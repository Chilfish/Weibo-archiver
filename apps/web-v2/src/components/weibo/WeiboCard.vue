<script setup lang="ts">
import type { Comment, LinkCard, Post, Retweet } from '@weibo-archiver/core'
import { computed, ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import ImageGallery from '../common/ImageGallery.vue'
import WeiboActions from './WeiboActions.vue'
import WeiboComments from './WeiboComments.vue'
import WeiboLinkCard from './WeiboLinkCard.vue'
import WeiboProfile from './WeiboProfile.vue'
import { WeiboText } from './WeiboText'

const props = defineProps<{
  post: Post | Retweet
  linkCard?: LinkCard
  isRetweet?: boolean
}>()

const actions = computed(() => ({
  likes: props.post.likesCount,
  reposts: props.post.repostsCount,
  comments: props.post.commentsCount,
}))

// 合并转发中的卡片，油猴脚本那边解析错了
const linkCard = computed(() => {
  // @ts-expect-error maybe undefined
  return props.post.card || props.linkCard
})

const user = computed(() => {
  return 'user' in props.post ? props.post.user : undefined
})

const comments = computed(() => {
  return 'comments' in props.post ? props.post.comments : [] as Comment[]
})

const isCommentsOpen = ref(false)
</script>

<template>
  <Card
    :id="post.mblogid"
    as="article"
    class="group w-full"
  >
    <CardContent>
      <WeiboProfile
        :meta="props.post"
        :user="user"
      />
      <WeiboText :text="props.post.text" />
      <ImageGallery
        class="pr-12"
        :images="props.post.imgs"
      />
      <WeiboLinkCard v-if="linkCard" :card="linkCard" />
      <WeiboActions
        v-if="!isRetweet"
        :actions="actions"
        @click-comment="isCommentsOpen = !isCommentsOpen"
      />

      <Collapsible
        v-if="comments.length"
        v-model:open="isCommentsOpen"
      >
        <CollapsibleContent>
          <WeiboComments :comments="comments" />
        </CollapsibleContent>
      </Collapsible>
    </CardContent>
  </Card>
</template>

<style>

</style>
