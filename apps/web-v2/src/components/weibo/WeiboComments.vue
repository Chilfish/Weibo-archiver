<script setup lang="ts">
import type { Comment } from '@workspace/shared'
import { formatDate } from '@workspace/shared'
import { Heart, MessageCircle } from 'lucide-vue-next'
import { emitter } from '../../composables'
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
            发布于 {{ formatDate(comment.created_at) }}
          </time>
          <div>
            {{ comment.region_name }}
          </div>

          <button class="ml-1 flex items-center gap-1">
            <Heart class="w-4 h-4" />
            {{ comment.like_count }}
          </button>
          <button class="flex items-center gap-1">
            <MessageCircle class="w-4 h-4" />
            {{ comment.comments_count }}
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
