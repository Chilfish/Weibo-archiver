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
    class="w-fit flex flex-col gap-1 rounded-2 p-3 sm:max-w-64vw sm:w-50vw"
  >
    <div class="flex items-center gap-4">
      <n-avatar
        lazy round
        fallback-src="/placeholder.webp"
        :size="56"
        :src="avatar"
        :img-props="{
          alt: `${user.name} avatar`,
          title: `${user.name} avatar`,
        }"
        class="ring-2 ring-white"
      />
      <div>
        <span
          class="inline-block text-4.5 font-bold"
        >
          @{{ user.name }}
        </span>
        <div class="text-3.5">
          {{ user.followers }} 粉丝
          <span class="mx-1">·</span>
          {{ user.followings }} 关注
        </div>
        <div
          v-if="user.postCount"
          class="text-3.5"
        >
          共导入了 {{ user.postCount }} 条微博
        </div>
      </div>
    </div>

    <div
      v-if="showMore"
      class="mt-3"
    >
      <div><strong>简介：</strong>{{ user.bio }}</div>
      <div><strong>生日：</strong>{{ user.birthday }}</div>
      <div><strong>注册于：</strong>{{ user.createdAt }}</div>
    </div>
  </div>
</template>
