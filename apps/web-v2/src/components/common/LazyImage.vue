<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import { replaceImg } from '@/composables'

type Numberish = number | string
type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'

type ClassName = string | Array<string | undefined>

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
  alt?: string
  style?: CSSProperties
  class?: ClassName
  /**
   * 是否使用原始 src，默认会使用用户设置的图床链接处理
   */
  rawSrc?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: []
  load: [{ width: number, height: number }]
  error: [string]
}>()

const imgRef = useTemplateRef<HTMLElement>('imgRef')
const isLoading = ref(true)
const imgSrc = ref('')
const imgWidth = ref<Numberish | undefined>(0)
const imgHeight = ref<Numberish | undefined>(0)

watch(() => props.src, src => imgSrc.value = src)

useIntersectionObserver(imgRef, ([{ isIntersecting }]) => {
  if (isIntersecting && isLoading.value) {
    const img = new Image()
    const src = props.rawSrc ? props.src : replaceImg(props.src)
    img.src = src
    imgSrc.value = src
    img.onload = () => {
      isLoading.value = false
      imgWidth.value = props.width
      imgHeight.value = props.height
      emit('load', { width: img.width, height: img.height })
      img.remove()
    }
    img.onerror = (e: any) => {
      // isLoading.value = false
      emit('error', e)
    }
  }
})
</script>

<template>
  <img
    v-show="!isLoading"
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
    :class="props.class"
    :style="props.style"
    loading="lazy"
    class="object-cover"
    @click="emit('click')"
  >
  <Skeleton
    v-if="isLoading"
    ref="imgRef"
    :class="props.class"
  />
</template>
