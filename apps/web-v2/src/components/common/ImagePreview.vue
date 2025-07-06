<script setup lang="ts">
import type { ImagePreviewEvent } from '@/types'
import { useEventListener } from '@vueuse/core'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { emitter } from '@/composables'
import LazyImage from './LazyImage.vue'

const images = ref<string[]>([])
const curImgIdx = ref(0)
const isOpen = ref(false)

const fabCss = `absolute rounded-full backdrop-blur text-white bg-[#000000aa] hover:bg-[#000000] hover:text-white`
const curImage = computed(() => images.value[curImgIdx.value] || '')

function openImagePreview(event: ImagePreviewEvent) {
  images.value = event.imgs
  curImgIdx.value = event.index
  isOpen.value = true
}

function nextImage() {
  if (curImgIdx.value < images.value.length - 1) {
    curImgIdx.value++
  }
  else {
    curImgIdx.value = 0
  }
}

function prevImage() {
  if (curImgIdx.value > 0) {
    curImgIdx.value--
  }
  else {
    curImgIdx.value = images.value.length - 1
  }
}

function closePreview() {
  isOpen.value = false
}

useEventListener(window, 'keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage()
  }
  else if (e.key === 'ArrowRight') {
    nextImage()
  }
})

emitter.on('open-image-preview', openImagePreview)

defineExpose({
  openImagePreview,
})
</script>

<template>
  <Dialog
    v-model:open="isOpen"
  >
    <DialogContent
      class="p-0 bg-transparent border-none w-auto! max-w-fit! focus-visible:outline-0"
      :show-close="false"
    >
      <div
        class="relative flex flex-col gap-4 justify-center items-center mx-auto w-[70vw] h-[96vh] "
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
          v-if="curImgIdx > 0"
          variant="ghost"
          size="icon"
          class="top-50% left-4"
          :class="[fabCss]"
          @click="prevImage"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          v-if="curImgIdx < images.length - 1"
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
          {{ curImgIdx + 1 }} / {{ images.length }}
        </Badge>

        <div
          class="overflow-auto py-2"
        >
          <LazyImage
            :key="curImage"
            class="rounded-xl w-[60vw]"
            :src="curImage"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
