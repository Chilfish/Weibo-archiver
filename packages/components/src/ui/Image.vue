<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}>(), {
  fit: 'contain',
  alt: 'image',
})
</script>

<template>
  <n-image
    lazy
    fallback-src="/placeholder.webp"
    :src="replaceImg(src)"
    :object-fit="fit"
    :alt="alt"
    :width="width"
    :height="height"
    :intersection-observer-options="{
      root: 'image-scroll-container',
    }"
    :img-props="{
      referrerpolicy: referrerPolicy,
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
</template>

<style>
.n-image img {
  width: 100%;
  border-radius: 4px;
}
</style>
