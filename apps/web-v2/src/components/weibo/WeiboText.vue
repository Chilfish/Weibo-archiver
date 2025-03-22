<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <p
    class="mb-4"
    v-html="props.text"
  />
</template>
