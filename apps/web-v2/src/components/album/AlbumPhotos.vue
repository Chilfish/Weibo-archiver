<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import LazyImage from '@/components/common/LazyImage.vue'
import { computed } from 'vue'

const props = defineProps<{
  posts: Post[]
}>()

const medias = computed(() => props.posts.flatMap(post => post.imgs))
</script>

<template>
  <div
    class="grid grid-cols-4 gap-1"
  >
    <div
      v-for="img in medias"
      :key="img"
      class="cursor-pointer aspect-square"
    >
      <LazyImage
        :src="img"
        alt="image"
        class="rounded-xl h-full w-full"
      />
    </div>
  </div>
</template>
