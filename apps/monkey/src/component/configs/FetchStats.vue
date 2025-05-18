<script setup lang="ts">
import { fetchCount } from '@/composables/useFetch'
</script>

<template>
  <label
    class="my-2 block"
  >
    已爬取数量
  </label>
  <div class="stats shadow items-center flex justify-center py-2 bg-base-100">
    <div class="stat place-items-center p-0">
      <div class="stat-title">
        微博
      </div>
      <div class="stat-value">
        {{ fetchCount.posts }}
      </div>
    </div>

    <div class="stat place-items-center p-0">
      <div class="stat-title">
        关注
      </div>
      <div class="stat-value">
        {{ fetchCount.followings }}
      </div>
    </div>

    <div class="stat place-items-center p-0">
      <div class="stat-title">
        收藏
      </div>
      <div class="stat-value">
        {{ fetchCount.favorites }}
      </div>
    </div>
  </div>
</template>
