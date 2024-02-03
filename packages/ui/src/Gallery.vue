<script setup lang="ts">
const props = defineProps<{
  imgs: string[]
}>()

const len = computed(() => props.imgs.length)

const { width: windowWidth } = useWindowSize()

const imgWidth = computed(() => {
  if (windowWidth.value < 480) {
    if (len.value === 1)
      return '13rem'
    return '7rem'
  }

  // 大屏
  if (len.value === 3 || len.value > 4)
    return '32%'
  else if (len.value === 1)
    return '30rem'
  return '13rem'
})

const maxHeight = computed(() => {
  if (len.value === 1)
    return '30rem'
  return windowWidth.value < 480 ? '7rem' : '13rem'
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
        :width="imgWidth"
        :min-height="windowWidth < 480 ? '10rem' : '13rem'"
        :height="len > 1 ? imgWidth : undefined"
        :style="{
          maxHeight,
          width: imgWidth,
        }"
        fit="cover"
        class="block overflow-hidden transition-all"
      />
    </n-image-group>
  </div>
</template>
