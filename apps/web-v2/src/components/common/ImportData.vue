<script setup lang="ts">
import { usePostStore } from '@/stores'

const { parseAndImport } = usePostStore()

async function readFile(e: Event) {
  return new Promise<string>((resolve, reject) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      reject(new Error('No file selected'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      resolve(data)
    }
    reader.readAsText(file)
  })
}

async function onImportData(e: Event) {
  const data = await readFile(e)
  await parseAndImport(data)
}
</script>

<template>
  <input
    type="file"
    accept=".json"
    class="absolute inset-0 opacity-0 w-full h-full"
    @change="onImportData"
  >
</template>
