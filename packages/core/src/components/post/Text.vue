<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const {
  text: parsedText,
  imgs,
} = useProtocol(props.text)
</script>

<template>
  <p
    class="whitespace-pre-wrap break-all text-4 text-black"
    v-html="parsedText"
  />
</template>
