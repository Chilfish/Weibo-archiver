<script setup lang="ts">
import type { AlbumPreviewEvent } from '@/types'
import type { Post } from '@weibo-archiver/core'
import AlbumPreviewWeibo from '@/components/album/AlbumPreviewWeibo.vue'
import LazyImage from '@/components/common/LazyImage.vue'
import { emitter } from '@/composables'
import { usePostStore } from '@/stores'
import { useEventListener } from '@vueuse/core'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const fabCss = `absolute rounded-full backdrop-blur text-white bg-[#000000aa] hover:bg-[#000000] hover:text-white`

const postStore = usePostStore()

const images = ref<string[]>([])
const curIndex = ref(0)
const isOpen = ref(false)

const curPost = ref<Post>()
const curImage = computed(() => images.value[curIndex.value] || '')

async function openImagePreview(event: AlbumPreviewEvent) {
  console.log(event)

  curPost.value = await postStore.getPostById(event.postId)
  console.log(curPost.value)
  if (!curPost.value) {
    return
  }

  images.value = curPost.value.imgs
  curIndex.value = event.idxOfImg
  isOpen.value = true
}

function nextImage() {
  if (curIndex.value < images.value.length - 1) {
    curIndex.value++
  }
  else {
    curIndex.value = 0
  }
}

function prevImage() {
  if (curIndex.value > 0) {
    curIndex.value--
  }
  else {
    curIndex.value = images.value.length - 1
  }
}

useEventListener(window, 'keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage()
  }
  else if (e.key === 'ArrowRight') {
    nextImage()
  }
})

emitter.on('open-album-preview', openImagePreview)
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
          @click.self="isOpen = false"
        >
          <Button
            variant="ghost"
            size="icon"
            class="top-4 left-4"
            :class="fabCss"
            @click="isOpen = false"
          >
            <XIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="top-50% left-4"
            :class="[fabCss]"
            @click="prevImage"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="top-50% right-4"
            :class="[fabCss]"
            @click="nextImage"
          >
            <ArrowRightIcon />
          </Button>

          <LazyImage
            class="max-h-[85%] rounded-xl"
            :src="curImage"
          />
        </div>

        <AlbumPreviewWeibo
          class="h-full w-[30vw]"
          :post="curPost"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
