<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import { formatDate } from '@weibo-archiver/core'
import { onBeforeMount, ref } from 'vue'
import { fetchCount } from '@/composables/useFetch'
import { usePost } from '@/composables/usePost'

const postStore = usePost()

const post = ref<Post>()

onBeforeMount(async () => {
  post.value = await postStore.getLastPost()
})
</script>

<template>
  <label
    class="my-2 block"
  >
    已爬取数量
  </label>
  <div class="stats rounded-xl items-center flex justify-between px-4 py-2 bg-base-100">
    <div class="stat place-items-center">
      <div class="stat-title">
        微博
      </div>
      <div class="stat-value">
        {{ fetchCount.posts }}
      </div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">
        关注
      </div>
      <div class="stat-value">
        {{ fetchCount.followings }}
      </div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">
        收藏
      </div>
      <div class="stat-value">
        {{ fetchCount.favorites }}
      </div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">
        上次停止爬取的时间
      </div>
      <div class="stat-value">
        {{ post?.createdAt ? formatDate(post.createdAt, 'YYYY年MM月DD日') : '暂无' }}
      </div>
    </div>
  </div>
</template>

<style>
.stats .stat {
  padding-block: 0;
  padding-inline: 0;
  width: fit-content;
}

.stat-value {
  font-size: 1rem !important;
}
</style>
