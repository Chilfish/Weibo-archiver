<script setup lang="ts">
import type { Comment, Post, Retweet } from '@types'

const props = defineProps<{
  meta: Post | Comment | Retweet
  isBody?: boolean
}>()

const date = useDateFormat(props.meta.created_at, 'YY-MM-DD HH:mm dddd')
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-end gap-1 text-3 text-gray sm:gap-3"
  >
    <a
      v-if="'mblogid' in meta && isBody"
      :href="`#${meta.mblogid}`"
      class="copy-id opacity-0 transition-opacity"
    >
      复制链接
    </a>

    <a
      :href="meta.detail_url"
      target="_blank"
    >
      跳转到原微博
    </a>

    <span>{{ date }}</span>

    <span> {{ meta.region_name }} </span>

    <span v-if="meta.source" class="hidden sm:inline">
      来自 <span v-html="meta.source" />
    </span>
  </div>
</template>
