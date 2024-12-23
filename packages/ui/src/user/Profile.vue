<script setup lang="ts">
import type { UserInfo } from '@shared'
import { replaceImg } from '@core/utils'

withDefaults(defineProps<{
  user: UserInfo
  showMore?: boolean
}>(), {
  showMore: true,
})
</script>

<template>
  <div
    class="w-fit flex flex-col gap-1 rounded-2 px-1 py-4"
  >
    <div class="flex items-center gap-4">
      <n-avatar
        lazy
        round
        bordered
        color="#9ca3af"
        text="3 center"
        :size="56"
        :src="replaceImg(user.avatar, true)"
        :img-props="{
          alt: `${user.name}'s avatar`,
        }"
        class="min-w-16 ring-2 ring-white"
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
      v-if="showMore && user.createdAt"
      class="mt-3"
    >
      <div><strong>简介：</strong>{{ user.bio }}</div>
      <div><strong>生日：</strong>{{ user.birthday }}</div>
      <div><strong>注册于：</strong>{{ user.createdAt }}</div>
    </div>
  </div>
</template>
