<script setup lang="ts">
import { usePostStore } from '@/stores'

const { parseAndImport } = usePostStore()
</script>

<template>
  <input
    type="file"
    accept=".json"
    class="absolute inset-0 opacity-0 w-full h-full"
    @change="parseAndImport"
  >
</template>
