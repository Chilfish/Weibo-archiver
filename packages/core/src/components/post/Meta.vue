<script setup lang="ts">
import type { Post } from '@core/types'

const props = defineProps<{
  post: Post
}>()

const date = useDateFormat(props.post.created_at, 'YY-MM-DD HH:mm dddd')
const detailUrl = `https://weibo.com/${props.post.user.id}/${props.post.mblogid}`
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-end gap-1 text-2 text-gray sm:gap-3"
  >
    <span v-if="post.source.length" class="hidden sm:inline">
      来自 <span v-html="post.source" />
    </span>

    <span> {{ post.region_name }} </span>

    <el-link
      :underline="false"
      :href="detailUrl"
      target="_blank"
      class="text-2! text-gray-400! hover:text-gray-600!"
    >
      {{ date }}
    </el-link>
  </div>
</template>
