<script setup lang="ts">
defineProps<{
  imgs: string[]
}>()
</script>

<template>
  <div
    :class="imgs.length > 9 ? 'grid-cols-4' : ' grid-cols-3'"
    class="grid mt-2 gap-1"
  >
    <el-image
      v-for="img in imgs"
      :key="img"
      fit="cover"
      :src="img"
      class="h-full max-h-52 max-w-48 w-full rounded"
    />
  </div>
</template>
