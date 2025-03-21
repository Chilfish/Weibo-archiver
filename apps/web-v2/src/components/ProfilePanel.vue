<script setup lang="ts">
import type { UserInfo } from '@workspace/shared'

defineProps<{
  user?: UserInfo
}>()
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 rounded-2xl p-4 h-fit shadow-sm">
    <div class="avatar mb-4">
      <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img
          :src="user?.avatar || '/placeholder.webp'"
          alt="User Profile"
        >
      </div>
    </div>
    <h2 class="text-xl font-bold text-base-content">
      {{ user?.name || '导入您的微博' }}
    </h2>
    <p class="text-center text-base-content/80 my-4">
      {{ user?.bio || '导入您的微博后，可查看您的微博数据' }}
    </p>

    <!-- 用户统计摘要 -->
    <div class="stats stats-horizontal shadow-sm w-full">
      <div class="stat place-items-center">
        <div class="stat-title text-xs">
          微博
        </div>
        <div class="stat-value text-xl">
          {{ user?.postCount || 0 }}
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title text-xs">
          关注
        </div>
        <div class="stat-value text-xl">
          {{ user?.followings || 0 }}
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title text-xs">
          粉丝
        </div>
        <div class="stat-value text-xl">
          {{ user?.followers || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
