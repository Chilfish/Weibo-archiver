<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div
    class="mb-4"
    v-html="text"
  />
</template>
