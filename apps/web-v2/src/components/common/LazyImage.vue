<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  imgClass?: string
}>()

const imgRef = useTemplateRef<HTMLImageElement>('imgRef')

const isLoading = ref(true)

onMounted(() => {
  const img = imgRef.value
  if (!img)
    return
  img.onload = () => {
    isLoading.value = false
  }
})
</script>

<template>
  <img
    v-show="!isLoading"
    ref="imgRef"
    :src="src"
    :alt="alt"
    :class="props.imgClass"
  >
  <div
    v-if="isLoading"
    class="skeleton h-full w-full"
  />
</template>
