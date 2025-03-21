<script setup lang="ts">
import { Heart, MessageCircle, Repeat } from 'lucide-vue-next'

interface Actions {
  likes: number
  reposts: number
  comments: number
}

defineProps<{
  actions: Actions
}>()
</script>

<template>
  <div class="weibo-actions flex items-center gap-6 select-none">
    <button
      class="hover:text-red-500"
    >
      <Heart class="w-4 h-4" />
      <span>{{ actions.likes }}</span>
    </button>
    <button class="hover:text-blue-500">
      <MessageCircle class="w-4 h-4" />
      <span>{{ actions.comments }}</span>
    </button>
    <button class="hover:text-green-500">
      <Repeat class="w-4 h-4" />
      <span>{{ actions.reposts }}</span>
    </button>
  </div>
</template>

<style>
.weibo-actions button {
  @apply flex items-center justify-center gap-2 transition-colors;
}
</style>
