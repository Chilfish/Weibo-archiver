<script setup lang="ts">
import type { AlbumPreviewEvent } from '@/types'
import type { Post } from '@weibo-archiver/core'
import AlbumPreview from '@/components/album/AlbumPreview.vue'
import LazyImage from '@/components/common/LazyImage.vue'
import { emitter } from '@/composables'
import { computed } from 'vue'

const props = defineProps<{
  posts: Post[]
}>()

const medias = computed(() => props.posts.flatMap(post => post.imgs.map((img, idx) => ({
  postId: post.mblogid,
  src: img,
  idx,
}))))

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
          postId: media.postId,
          idxOfImg: media.idx,
        })"
      />
    </div>

    <AlbumPreview />
  </div>
</template>
