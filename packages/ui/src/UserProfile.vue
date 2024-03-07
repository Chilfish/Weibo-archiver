<script setup lang="ts">
import type { UserInfo } from '@types'

const props = withDefaults(defineProps<{
  user: UserInfo
  showMore?: boolean
}>(), {
  showMore: true,
})

const avatar = computed(() => {
  const url = props.user.avatar
  if (!url)
    return '/placeholder.webp'

  const { pathname } = new URL(url)
  return `${imgCdn}${pathname}`
})
</script>

<template>
  <div
    class="max-w-fit flex flex-col gap-1 rounded-2 p-3"
  >
    <div class="flex items-center gap-4">
      <n-avatar
        lazy round
        fallback-src="/placeholder.webp"
        :size="52"
        :src="avatar"
        class="ring-2 ring-white"
      />
      <div>
        <span
          class="inline-block text-4.5 font-bold"
        >
          {{ user.name }}
        </span>
        <div class="text-3.5">
          {{ user.followers }} 粉丝
          {{ user.followings }} 关注
        </div>
      </div>
    </div>

    <div
      v-if="showMore"
      class="mt-3"
    >
      <div>简介：{{ user.bio }}</div>
      <div>生日：{{ user.birthday }}</div>
      <div>注册于：{{ user.createdAt }}</div>
    </div>
  </div>
</template>
