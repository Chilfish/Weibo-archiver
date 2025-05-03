<script setup lang="ts">
import type { ImagePreviewEvent } from '../../types'
import { useEventListener } from '@vueuse/core'
import { downloadFile } from '@weibo-archiver/core'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  X,
} from 'lucide-vue-next'
import { computed, ref, useTemplateRef } from 'vue'
import { emitter } from '../../composables'
import LazyImage from './LazyImage.vue'

const images = ref<string[]>([])
const currentIndex = ref(0)
const wrapperCss = ref('md:w-[80vw]')

const imagePreviewDialog = useTemplateRef<HTMLDialogElement>('imagePreviewDialog')

const hasMultipleImages = computed(() => images.value.length > 1)
const currentImage = computed(() => images.value[currentIndex.value] || '')

function openImagePreview(event: ImagePreviewEvent) {
  images.value = event.imgs
  currentIndex.value = event.index
  imagePreviewDialog.value?.showModal()
}

function openInNewTab() {
  if (currentImage.value) {
    window.open(currentImage.value, '_blank')
  }
}

function downloadImage() {
  if (!currentImage.value)
    return
  const name = new URL(currentImage.value).pathname.split('/').pop() || 'image'
  downloadFile(currentImage.value, name)
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

function closeModal() {
  imagePreviewDialog.value?.close()
}

emitter.on('open-image-preview', openImagePreview)

defineExpose({
  openImagePreview,
})
</script>

<template>
  <dialog
    ref="imagePreviewDialog"
    class="modal"
    aria-label="图片预览"
  >
    <div class="modal-box p-0 max-w-fit relative transition-all">
      <!-- Image container with transform -->
      <div
        class="flex justify-center items-center overflow-auto"
      >
        <LazyImage
          :key="currentImage"
          :src="currentImage"
          :wrapper-class="[
            wrapperCss,
            'w-[90vw]',
            'md:h-[90vh]',
          ]"
          alt="预览图片"
          @load="() => {
            wrapperCss = 'w-auto'
          }"
        />
      </div>

      <!-- Toolbar -->
      <div class="bg-base-300 p-2 flex justify-center gap-2 items-center">
        <!-- Left side controls: Navigation -->
        <div class="flex gap-2">
          <button
            v-if="hasMultipleImages"
            class="btn btn-circle btn-sm"
            @click="prevImage"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            v-if="hasMultipleImages"
            class="btn btn-circle btn-sm"
            @click="nextImage"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
          <div v-if="hasMultipleImages" class="badge badge-neutral my-auto ml-2">
            {{ currentIndex + 1 }}/{{ images.length }}
          </div>
        </div>

        <div class="join ml-2">
          <button class="btn btn-sm join-item" @click="openInNewTab">
            <ExternalLink class="w-4 h-4" />
          </button>
          <button class="btn btn-sm join-item" @click="downloadImage">
            <Download class="w-4 h-4" />
          </button>
          <button class="btn btn-sm join-item" @click="closeModal">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal backdrop -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
