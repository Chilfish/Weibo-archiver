<script setup lang="ts">
import { computed } from 'vue'
import LazyImage from './LazyImage.vue'

const props = defineProps<{
  src?: string
  alt?: string
  size?: number | string
  class?: string
}>()

const sizeClass = computed(() => {
  return props.size ? `w-${props.size} h-${props.size}` : 'w-10 h-10'
})
</script>

<template>
  <div class="relative">
    <LazyImage
      :src="src || '/placeholder.webp'"
      :alt="alt || '用户头像'"
      class="rounded-full"
      :class="[sizeClass, props.class]"
      :skeleton-class="[sizeClass, 'rounded-full absolute inset-0']"
    />
  </div>
</template>
