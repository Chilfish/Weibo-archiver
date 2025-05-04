<script setup lang="ts">
import type { ImagePreviewEvent } from '@/types'
import { emitter } from '@/composables'
import { useEventListener } from '@vueuse/core'
import { computed, ref } from 'vue'
import LazyImage from './LazyImage.vue'

const images = ref<string[]>([])
const currentIndex = ref(0)
const isOpen = ref(false)

const currentImage = computed(() => images.value[currentIndex.value] || '')

function openImagePreview(event: ImagePreviewEvent) {
  images.value = event.imgs
  currentIndex.value = event.index
  isOpen.value = true
}

function nextImage() {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
  }
  else {
    currentIndex.value = 0
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
  else {
    currentIndex.value = images.value.length - 1
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

emitter.on('open-image-preview', openImagePreview)

defineExpose({
  openImagePreview,
})
</script>

<template>
  <Dialog
    v-model:open="isOpen"
  >
    <DialogScrollContent
      class="p-0 border-none w-[90vw]"
      :show-close="false"
    >
      <LazyImage
        :key="currentImage"
        :src="currentImage"
        alt="预览图片"
        class="rounded"
      />
    </DialogScrollContent>
  </Dialog>
</template>
