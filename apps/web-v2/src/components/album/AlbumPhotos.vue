<script setup lang="ts">
import type { AlbumPreviewEvent } from '@/types'
import type { Post } from '@weibo-archiver/core'
import LazyImage from '@/components/common/LazyImage.vue'
import { emitter } from '@/composables'
import { computed } from 'vue'

const props = defineProps<{
  posts: Post[]
}>()

const medias = computed(() => props.posts.flatMap((post, postIdx) =>
  post.imgs.map((img, idx) => ({
    postId: post.mblogid,
    postIdx,
    src: img,
    idx,
  }))),
)

function openPreview(event: AlbumPreviewEvent) {
  emitter.emit('open-album-preview', event)
}
</script>

<template>
  <div
    class="grid grid-cols-4 gap-1"
  >
    <div
      v-for="media in medias"
      :key="media.src"
      class="cursor-pointer aspect-square"
    >
      <LazyImage
        :src="media.src"
        alt="image"
        class="rounded-xl h-full w-full"
        @click="openPreview({
          idxOfPost: media.postIdx,
          idxOfImg: media.idx,
          posts: props.posts,
        })"
      />
    </div>
  </div>
</template>
