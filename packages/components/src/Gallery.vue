<script setup lang="ts">
const props = defineProps<{
  imgs: string[]
}>()

const width = computed(() => {
  const len = props.imgs.length
  if (len <= 2)
    return `40%`
  if (len >= 4 && len <= 5)
    return `24%`
  return '32%'
})

const maxHeight = computed(() => {
  const len = props.imgs.length
  if (len === 1)
    return 'fit-content'
  return '13rem'
})
</script>

<template>
  <div
    class="mt-4 w-fit flex flex-wrap items-center gap-2"
  >
    <n-image-group>
      <ui-image
        v-for="img in imgs"
        :key="img"
        :src="img"
        :style="{
          width,
          maxHeight,
        }"
        class="block overflow-hidden"
      />
    </n-image-group>
  </div>
</template>
