<script setup lang="ts">
const props = defineProps<{
  imgs: string[]
}>()

const cols = computed(() => {
  const len = props.imgs.length
  if (len < 4)
    return len + 1
  return len > 9 ? 4 : 3
})
</script>

<template>
  <div
    :class="`grid-cols-${cols}`"
    class="grid-rows-auto grid mt-2 gap-1"
  >
    <el-image
      v-for="img in imgs"
      :key="img"
      :src="img"
      :lazy="true"
      :hide-on-click-modal="true"
      :preview-src-list="imgs"
      fit="cover"
      class="h-full max-h-52 max-w-48 w-full cursor-pointer rounded"
    />
  </div>
</template>
