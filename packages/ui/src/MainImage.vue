<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  minHeight?: string | number
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
    :preview-src="replaceImg(src)"
    :img-props="{
      style: {
        minHeight,
        minWidth: width,
      },
      class: 'transition-all',
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

<style lang="scss">
$error-height: 7rem;

.n-image img {
  width: 100%;
  border-radius: 4px;
}

.n-image.img-error {
  width: $error-height !important;
  img {
    min-width: $error-height !important;
    min-height: $error-height !important;
  }
}
</style>
