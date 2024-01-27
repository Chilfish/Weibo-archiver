<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}>(), {
  fit: 'cover',
  alt: 'image',
})
</script>

<template>
  <n-image-group>
    <n-image
      fit="cover"
      lazy
      fallback-src="/placeholder.webp"
      :alt="alt"
      :width="width"
      :height="height"
      :src="replaceImg(src)"
      :referrerpolicy="referrerPolicy"
      :intersection-observer-options="{
        root: 'image-scroll-container',
      }"
    >
      <template #placeholder>
        <div
          class="h-full w-full center"
        >
          Loading
        </div>
      </template>
    </n-image>
  </n-image-group>
</template>
