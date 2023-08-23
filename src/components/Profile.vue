<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <a
    class="my-1 flex items-center gap-4"
    :href="`https://weibo.com/u/${user.idstr}`"
    target="_blank"
  >
    <el-avatar
      :size="40"
      :src="user.profile_image_url"
    />

    <span class="text-4! font-bold! hover:text-teal-700!">
      {{ user.screen_name }}
    </span>
  </a>
</template>
