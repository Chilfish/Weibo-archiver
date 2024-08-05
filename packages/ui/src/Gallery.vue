<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  imgs: string[]
}>()

const { width } = useWindowSize()
const len = computed(() => props.imgs.length)

const isMobile = computed(() => width.value < 768)

const miniHeight = computed(() => {
  if (len.value === 1)
    return undefined
  if (isMobile.value)
    return '7rem'
  return '14rem'
})

const maxHeight = computed(() => {
  if (len.value === 1)
    return isMobile.value ? '7rem' : '14rem'

  if (len.value === 2)
    return '10rem'

  return isMobile.value ? '7rem' : '14rem'
})

const imgWidth = computed(() => {
  if (len.value === 1)
    return isMobile.value ? '12rem' : '24rem'
  if (len.value === 2)
    return '10rem'

  return '30%'
})

// 图片长宽什么的好麻烦啊……
</script>

<template>
  <div
    class="mt-4 min-w-fit flex flex-wrap items-center gap-3px"
  >
    <n-image-group>
      <main-image
        v-for="img in imgs"
        :key="img"
        :src="img"
        :style="{
          width: imgWidth,
          height: len > 1 && imgWidth,
          maxHeight,
        }"
        :min-height="miniHeight"
        fit="cover"
        class="block overflow-hidden transition-all"
      />
    </n-image-group>
  </div>
</template>

<style scoped>
.n-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
