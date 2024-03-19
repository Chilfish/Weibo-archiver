<script setup lang="ts">
const props = defineProps<{
  imgs: string[]
}>()

const len = computed(() => props.imgs.length)

const imgWidth = computed(() => {
  if (len.value === 1)
    return '14rem'
  if (len.value === 2)
    return '10rem'

  return '32%'
})
</script>

<template>
  <div
    class="mt-4 min-w-fit flex flex-wrap items-center gap-1"
  >
    <n-image-group>
      <main-image
        v-for="img in imgs"
        :key="img"
        :src="img"
        :style="{
          width: imgWidth,
          height: len > 1 && imgWidth,
          maxHeight: '16rem',
        }"
        fit="cover"
        class="block overflow-hidden transition-all"
      />
    </n-image-group>
  </div>
</template>
