<script setup lang="ts">
import type { UserBio } from '@shared'
import { replaceImg } from '@core/utils'

defineProps<{
  user: UserBio
}>()
</script>

<template>
  <a
    :href="`https://weibo.com/n/${user.name}`"
    target="_blank"
    rel="noopener noreferrer nofollow"
    class="flex items-center rounded-2 p-4 transition-all space-x-4"
    hover:bg="gray-100 dark:dark-4 shadow"
  >
    <n-avatar
      lazy
      round
      bordered
      color="#9ca3af"
      :src="replaceImg(user.avatar, true)"
      :img-props="{
        alt: `${user.name}'s avatar`,
      }"
      class="h-12 min-w-12 ring-2 ring-white"
      sm="h-14 min-w-14"
    />
    <div>
      <div class="text-3.5 font-bold sm:text-4">
        <span>
          @{{ user.name }}
        </span>
        <span
          v-if="user.remark"
          class="text-xs text-gray-500"
        >
          （{{ user.remark }}）
        </span>
      </div>
      <div
        text="sm:4 3 black dark:light-8"
      >
        {{ user.bio || '暂无简介' }}
      </div>
    </div>
  </a>
</template>
