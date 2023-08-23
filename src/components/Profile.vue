<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <a
    class="my-1 mr-auto flex items-center gap-2"
    :href="`https://weibo.com/u/${user.idstr}`"
    target="_blank"
  >
    <el-avatar
      :size="30"
      :src="user.profile_image_url"
    />

    <span class="text-3! font-bold! hover:text-teal-700!">
      {{ user.screen_name }}
    </span>
  </a>
</template>
