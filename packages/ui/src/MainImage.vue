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
    src="/placeholder.webp"
    :object-fit="fit"
    :alt="alt"
    :width="width"
    :height="height"
    :preview-src="replaceImg(src)"
    :img-props="{
      referrerpolicy: referrerPolicy,
    }"
  >
    <template #placeholder>
      <img
        src="/placeholder.webp"
        class="h-full w-full"
      >
    </template>
  </n-image>
</template>

<style>
.n-image img {
  width: 100%;
  border-radius: 4px;
}
</style>
