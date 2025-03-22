<script setup lang="ts">
import { computed } from 'vue'
import LazyImage from './LazyImage.vue'

const props = defineProps<{
  src: string
  alt?: string
  size?: number
}>()

const sizeClass = computed(() => {
  return props.size ? `w-${props.size} h-${props.size}` : 'w-10 h-10'
})
</script>

<template>
  <LazyImage
    :src="src || '/placeholder.webp'"
    :alt="alt"
    class="rounded-full" :class="[sizeClass]"
    :skeleton-class="[sizeClass, 'rounded-full']"
  />
</template>
