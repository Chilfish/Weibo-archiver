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
      v-for="img in imgs.map(replaceImg)"
      :key="img"
      :src="img"
      :lazy="true"
      :hide-on-click-modal="true"
      :preview-teleported="true"
      :preview-src-list="imgs.map(replaceImg)"
      fit="cover"
      :referrerpolicy="referrerPolicy"
      class="h-28 max-h-52 max-w-48 w-28 cursor-pointer rounded sm:h-80 sm:w-80"
    >
      <template #placeholder>
        <div class="p-20 text-center font-bold">
          Loading
        </div>
      </template>
    </el-image>
  </div>
</template>
