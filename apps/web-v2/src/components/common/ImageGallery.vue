<script setup lang="ts">
import { emitter } from '@/composables'
import { computed } from 'vue'
import LazyImage from './LazyImage.vue'

interface Image {
  src: string
  alt: string
}

const props = defineProps<{
  images: Image[] | string[]
}>()
const emits = defineEmits<{
  click: [string, number]
}>()

const computedImages = computed(() => {
  return props.images.map((image) => {
    return typeof image === 'string'
      ? {
          src: image,
          alt: '',
        }
      : image
  })
})

const imageUrls = computed(() => {
  return props.images.map((image) => {
    return typeof image === 'string' ? image : image.src
  })
})

function handleClick(src: string, index: number) {
  emitter.emit('open-image-preview', {
    index,
    imgs: imageUrls.value,
  })
  emits('click', src, index)
}

const imgSize = 'h-36 w-36'
const gridClass = computed(() => {
  const length = props.images.length
  const grid3x3 = [3, 5, 6, 7, 8, 9]

  if (grid3x3.includes(length) || length > 9)
    return 'grid-3x3'
  return 'grid-2x2'
})
</script>

<template>
  <div
    v-if="images.length > 1"
    class="image-grid mb-4"
    :class="gridClass"
  >
    <LazyImage
      v-for="(image, index) in computedImages"
      :key="image.src"
      :src="image.src.replace('/large/', '/orj360/')"
      :alt="image.alt"
      :class="imgSize"
      @click="handleClick(image.src, index)"
    />
  </div>

  <div
    v-else-if="computedImages[0]?.src"
    class="mb-4"
  >
    <LazyImage
      class="rounded-lg max-h-96 min-h-46 min-w-46"
      :src="computedImages[0].src"
      :alt="computedImages[0].alt"
      @click="handleClick(computedImages[0].src, 0)"
    />
  </div>
</template>

<style>
.image-grid {
  display: grid;
  gap: 4px;
  width: fit-content;
}

.grid-3x3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-2x2 {
  grid-template-columns: 1fr 1fr;
}

.image-grid img,
.image-grid video {
  object-fit: cover;
  border-radius: 6px;
}
</style>
