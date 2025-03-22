<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

type Numberish = number | string
type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'

interface Props {
  crossorigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  height?: Numberish
  loading?: 'eager' | 'lazy'
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  src: string
  srcset?: string
  usemap?: string
  width?: Numberish
  class?: string
  alt?: string
  skeletonClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const imgRef = ref<HTMLImageElement>()
const isLoading = ref(true)
const imgSrc = ref('')
const imgWidth = ref<Numberish | undefined>(0)
const imgHeight = ref<Numberish | undefined>(0)

useIntersectionObserver(imgRef, ([{ isIntersecting }]) => {
  if (isIntersecting && isLoading.value) {
    const img = new Image()
    img.src = props.src
    img.onload = () => {
      imgSrc.value = props.src
      isLoading.value = false
      imgWidth.value = props.width
      imgHeight.value = props.height
    }
    img.onerror = () => {
      isLoading.value = true
      imgSrc.value = '/placeholder.webp'
    }
  }
})
</script>

<template>
  <img
    ref="imgRef"
    :src="imgSrc"
    v-bind="{
      alt: props.alt,
      crossorigin: props.crossorigin,
      decoding: props.decoding,
      referrerpolicy: props.referrerpolicy,
      sizes: props.sizes,
      srcset: props.srcset,
      usemap: props.usemap,
    }"
    :class="[props.class]"
    :style="{
      width: imgWidth !== undefined ? `${imgWidth}px` : undefined,
      height: imgHeight !== undefined ? `${imgHeight}px` : undefined,
    }"
    loading="lazy"
    @click="emit('click')"
  >
  <div
    v-if="isLoading"
    class="skeleton" :class="[props.skeletonClass]"
  />
</template>
