<script setup lang="ts">
import { formatNumber } from '@weibo-archiver/core'
import { Heart, MessageCircle, Repeat } from 'lucide-vue-next'

interface Actions {
  likes: number
  reposts: number
  comments: number
}

defineProps<{
  actions: Actions
}>()

defineEmits<{
  clickLike: []
  clickRepost: []
  clickComment: []
}>()
</script>

<template>
  <div class="weibo-actions flex items-center gap-6 select-none">
    <button
      class="hover:text-red-500"
      :title="`点赞 ${actions.likes}`"
      @click="$emit('clickLike')"
    >
      <Heart class="w-4 h-4" />
      <span>{{ formatNumber(actions.likes) }}</span>
    </button>
    <button
      class="hover:text-blue-500"
      :title="`评论 ${actions.comments}`"
      @click="$emit('clickComment')"
    >
      <MessageCircle class="w-4 h-4" />
      <span>{{ formatNumber(actions.comments) }}</span>
    </button>
    <button
      class="hover:text-green-500"
      :title="`转发 ${actions.reposts}`"
      @click="$emit('clickRepost')"
    >
      <Repeat class="w-4 h-4" />
      <span>{{ formatNumber(actions.reposts) }}</span>
    </button>
  </div>
</template>

<style>
.weibo-actions button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}
</style>
