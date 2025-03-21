<script setup lang="ts">
import { computed } from 'vue'
import LazyImage from './LazyImage.vue'

interface Image {
  src: string
  alt: string
}

const props = defineProps<{
  images: Image[] | string[]
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
</script>

<template>
  <div
    v-if="images.length > 1"
    class="image-grid image-grid-9 mb-4"
  >
    <div
      v-for="image in computedImages"
      :key="image.src"
      class="image-grid-item"
    >
      <LazyImage
        :src="image.src"
        :alt="image.alt"
        skeleton-class="min-h-12 md:min-h-48"
      />
    </div>
  </div>

  <div
    v-else-if="computedImages[0]?.src"
    class="image-grid image-grid-1 mb-4"
  >
    <div class="image-grid-item">
      <LazyImage
        :src="computedImages[0].src"
        :alt="computedImages[0].alt"
      />
    </div>
  </div>
</template>

<style>
.image-grid {
  display: grid;
  grid-gap: 4px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.image-grid-1 {
  grid-template-columns: 1fr;
}

.image-grid-1 .image-grid-item img{
  width: auto;
}

.image-grid-2,
.image-grid-4 {
  grid-template-columns: 1fr 1fr;
}

.image-grid-3,
.image-grid-5,
.image-grid-6,
.image-grid-7,
.image-grid-8,
.image-grid-9 {
  grid-template-columns: 1fr 1fr 1fr;
}

.image-grid-item {
  position: relative;
  overflow: hidden;
  min-height: 12rem;
}

.image-grid-item img,
.image-grid-item video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.image-grid-1 .image-grid-item {
  padding-bottom: 56.25%;
  max-height: 380px;
}

.image-grid-1 .image-grid-item img,
.image-grid-1 .image-grid-item video {
  object-fit: contain;
  background-color: #f0f0f0;
}
</style>
