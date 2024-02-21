<script setup lang="ts">
import { FileIPC } from '#preload'

const selectedFolder = ref('')
const selectedFile = ref({
  path: '',
  name: '',
  size: 0,
})
</script>

<template>
  <div>
    <p>Selected folder: {{ selectedFolder }}</p>
    <button
      class="btn"
      @click="async() => {
        let res = await FileIPC.selectFolder()
        if (res === '')
          res = configRef.configPath

        selectedFolder = res
        config.set('dataPath', res)
      }"
    >
      Select folder
    </button>

    <p>Selectd File {{ selectedFile }}</p>
    <button
      class="btn"
      @click="async() => {
        const path = await FileIPC.selectFile()
        if (path === '')
          return
        const file = await FileIPC.readFile(path)

        if (!file)
          return console.error('File not found')

        const separator = path.includes('/') ? '/' : '\\'

        selectedFile = {
          path,
          name: path.split(separator).pop() || '',
          size: file.byteLength,
        }
      }"
    >
      Select File
    </button>
  </div>
</template>
