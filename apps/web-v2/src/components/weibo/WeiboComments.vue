<script setup lang="ts">
import type { Comment } from '@weibo-archiver/core'
import { formatDate, formatNumber } from '@weibo-archiver/core'
import { Heart, MessageCircle } from 'lucide-vue-next'
import { emitter } from '@/composables'
import Avatar from '../common/Avatar.vue'
import LazyImage from '../common/LazyImage.vue'
import { WeiboText } from './WeiboText'

defineProps<{
  comments: Comment[]
}>()

function previewImage(url: string) {
  emitter.emit('open-image-preview', {
    imgs: [url],
    index: 0,
  })
}
</script>

<template>
  <ul
    class="list"
  >
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex gap-3 py-2"
    >
      <Avatar
        :src="comment.user.avatar"
        :alt="comment.user.name"
        :size="8"
      />
      <div class="flex flex-col w-full">
        <a
          :href="`https://weibo.com/n/${comment.user.name}`"
          target="_blank"
          class="font-bold text-base-content"
        >
          {{ comment.user.name }}
        </a>

        <WeiboText
          class="my-1 text-base"
          :text="comment.text"
        />

        <LazyImage
          v-if="comment.img"
          :src="comment.img"
          class="h-42 w-fit mt-2 rounded-md"
          @click="previewImage(comment.img)"
        />

        <div class=" flex items-center gap-2 mt-2 ml-auto text-xs text-gray-500">
          <time>
            发布于 {{ formatDate(comment.createdAt) }}
          </time>
          <div>
            {{ comment.regionName }}
          </div>

          <button
            :title="`点赞 ${comment.likesCount}`"
            class="ml-1 flex items-center gap-1 hover:text-red-500"
          >
            <Heart class="w-4 h-4" />
            {{ formatNumber(comment.likesCount) }}
          </button>
          <button
            :title="`评论 ${comment.commentsCount}`"
            class="flex items-center gap-1 hover:text-blue-500"
          >
            <MessageCircle class="w-4 h-4" />
            {{ formatNumber(comment.commentsCount) }}
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
