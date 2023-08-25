<script setup lang="ts">
defineProps<{
  imgs: string[]
}>()
</script>

<template>
  <div
    class="grid grid-cols-3 mt-2 w-fit items-start justify-start gap-1"
  >
    <el-image
      v-for="img in imgs.map(previewImg)"
      :key="img"
      :src="img"
      :lazy="true"
      :hide-on-click-modal="true"
      :preview-src-list="imgs"
      fit="cover"
      :referrerpolicy="referrerPolicy"
      class="h-xs max-h-52 max-w-48 w-xs cursor-pointer rounded"
    >
      <template #placeholder>
        <div class="p-20 text-center font-bold">
          Loading
        </div>
      </template>
    </el-image>
  </div>
</template>
