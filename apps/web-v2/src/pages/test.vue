<script setup lang="ts">
import { message } from '@weibo-archiver/core'
import { ref } from 'vue'

const searchText = ref('')
const result = ref<any>({})

async function startFetch() {
  if (!searchText.value) {
    return
  }

  result.value = 'loading'
  message.sendMessage('fetch:user', searchText.value)
}

message.onMessage('result:user', user => result.value = user)
</script>

<template>
  <main class="gap-4 flex flex-col">
    <Button
      id="startFetch"
      class="w-fit"
      @click="startFetch"
    >
      Start fetch
    </Button>
    <Input
      v-model="searchText"
    />

    <pre>{{ JSON.stringify(result, null, 2) }}</pre>
  </main>
</template>
