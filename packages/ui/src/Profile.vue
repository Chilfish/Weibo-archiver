<script setup lang="ts">
import type { User } from '@types'

defineProps<{
  user: User
}>()
</script>

<template>
  <a
    class="mr-auto flex items-center gap-2"
    :href="`https://weibo.com/u/${user.id}`"
    target="_blank"
  >
    <n-avatar
      round
      fallback-src="/placeholder.webp"
      :size="30"
      :src="replaceImg(user.profile_image_url)"
    />

    <span class="text-3! font-bold! hover:text-teal-700!">
      {{ user.screen_name }}
    </span>
  </a>
</template>
