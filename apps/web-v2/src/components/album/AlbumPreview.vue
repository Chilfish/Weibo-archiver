<script setup lang="ts">
import type { AlbumPreviewEvent } from '@/types'
import type { Post } from '@weibo-archiver/core'
import AlbumPreviewWeibo from '@/components/album/AlbumPreviewWeibo.vue'
import LazyImage from '@/components/common/LazyImage.vue'
import { emitter } from '@/composables'
import { cn } from '@/lib/utils'
import { useEventListener } from '@vueuse/core'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const emits = defineEmits<{
  nextPage: [(newPots: Post[]) => any]
}>()

const fabCss = `absolute rounded-full backdrop-blur text-white bg-[#000000aa] hover:bg-[#000000] hover:text-white`

const posts = ref<Post[]>([])
const curImgIdx = ref(0)
const curPostIdx = ref(0)
const isOpen = ref(false)
const hasNextPost = ref(true)
const imgSize = ref(0)

const curPost = computed<Post>(() => posts.value[curPostIdx.value])
const curImagesLen = computed<number>(() => curPost.value.imgs.length)
const curImage = computed<string>(() => curPost.value.imgs[curImgIdx.value] || '')
const dontHasPrevPost = computed<boolean>(() => curPostIdx.value < 1)

async function openImagePreview(event: AlbumPreviewEvent) {
  console.log(event)

  curImgIdx.value = event.idxOfImg
  curPostIdx.value = event.idxOfPost
  posts.value = [...event.posts]
  isOpen.value = true
}

function loadNextPosts() {
  emits('nextPage', (newPosts) => {
    if (newPosts.length < 1) {
      hasNextPost.value = false
    }
    posts.value.push(...newPosts)
  })
}

function nextImage() {
  if (curImgIdx.value < curImagesLen.value - 1) {
    curImgIdx.value += 1
  }
  else {
    curImgIdx.value = 0
    curPostIdx.value += 1
  }

  if (curPostIdx.value === posts.value.length) {
    loadNextPosts()
  }
}

function prevImage() {
  if (curImgIdx.value > 0) {
    curImgIdx.value -= 1
  }
  else {
    curPostIdx.value -= 1
    curImgIdx.value = curImagesLen.value - 1
  }
}

useEventListener(window, 'keydown', (e) => {
  if (e.key === 'ArrowLeft' && !dontHasPrevPost.value) {
    prevImage()
  }
  else if (e.key === 'ArrowRight' && hasNextPost.value) {
    nextImage()
  }
  else if (e.key === 'ArrowUp' && !dontHasPrevPost.value) {
    curPostIdx.value -= 1
    curImgIdx.value = 0
  }
  else if (e.key === 'ArrowDown' && hasNextPost.value) {
    curImgIdx.value = 0
    curPostIdx.value += 1

    if (curPostIdx.value === posts.value.length) {
      loadNextPosts()
    }
  }
})

emitter.on('open-album-preview', openImagePreview)

function closePreview() {
  isOpen.value = false
  posts.value = []
}
</script>

<template>
  <Dialog
    v-model:open="isOpen"
  >
    <DialogContent
      class="p-0 rounded-xl border-none bg-transparent w-screen top-0 left-0 sm:max-w-screen translate-y-0 translate-x-0"
      :show-close="false"
    >
      <div
        v-if="curPost"
        class="flex h-screen items-center"
      >
        <div
          class="relative flex flex-col gap-4 justify-center items-center w-[70vw] h-full bg-[#0000009e] backdrop-blur"
          @click.self="closePreview"
        >
          <Button
            variant="ghost"
            size="icon"
            class="top-4 left-4"
            :class="fabCss"
            @click="closePreview"
          >
            <XIcon />
          </Button>
          <Button
            v-if="!dontHasPrevPost"
            variant="ghost"
            size="icon"
            class="top-50% left-4"
            :class="[fabCss]"
            @click="prevImage"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            v-if="hasNextPost"
            variant="ghost"
            size="icon"
            class="top-50% right-4"
            :class="[fabCss]"
            @click="nextImage"
          >
            <ArrowRightIcon />
          </Button>

          <Badge
            :class="fabCss"
            class="top-4 right-4"
          >
            {{ curImgIdx + 1 }} / {{ curImagesLen }}
          </Badge>

          <LazyImage
            :key="curImage"
            class="rounded-xl"
            :class="cn({
              'h-[85vh]': imgSize < 1.5,
            })"
            :src="curImage"
            @load="({ width, height }) => imgSize = width / height"
          />
        </div>

        <AlbumPreviewWeibo
          :key="curPost.mblogid"
          class="h-full w-[30vw]"
          :post="curPost"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
