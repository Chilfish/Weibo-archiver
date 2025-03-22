<script setup lang="ts">
import type { ImagePreviewEvent } from '../../types'
import { useEventListener } from '@vueuse/core'
import { downloadFile } from '@workspace/core'
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
const scale = ref(1)
const isDragging = ref(false)
const position = ref({ x: 0, y: 0 })

const imagePreviewDialog = useTemplateRef<HTMLDialogElement>('imagePreviewDialog')

const hasMultipleImages = computed(() => images.value.length > 1)
const currentImage = computed(() => images.value[currentIndex.value] || '')

function openImagePreview(event: ImagePreviewEvent) {
  images.value = event.imgs
  currentIndex.value = event.index
  resetView()
  imagePreviewDialog.value?.showModal()
}

function resetView() {
  scale.value = 1
  position.value = { x: 0, y: 0 }
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
    resetView()
  }
  else {
    currentIndex.value = 0
    resetView()
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetView()
  }
  else {
    currentIndex.value = images.value.length - 1
    resetView()
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
  resetView()
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
        class="flex justify-center items-center overflow-hidden"
      >
        <LazyImage
          :key="currentImage"
          :src="currentImage"
          skeleton-class="h-96 w-96"
          :style="{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? 'move' : 'default',
            transition: isDragging ? 'none' : 'transform 0.2s',
          }"
          class="w-[90vw] md:w-auto md:h-[90vh] object-contain"
          alt="预览图片"
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
