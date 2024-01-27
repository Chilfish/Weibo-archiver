<script setup lang="ts">
defineProps<{
  imgs: string[]
}>()
</script>

<template>
  <div
    class="grid grid-cols-3 mt-2 w-fit items-start justify-start gap-1"
  >
    <ui-image
      v-for="img in imgs.map(replaceImg)"
      :key="img"
      :src="img"
      class="h-28 max-h-52 max-w-48 w-28 cursor-pointer rounded sm:h-80 sm:w-80"
    />
  </div>
</template>
