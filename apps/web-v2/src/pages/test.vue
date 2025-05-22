<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const searchText = ref('')
const result = ref<any>({})

async function startFetch() {
  if (!searchText.value) {
    return
  }

  result.value = 'loading'
  window.postMessage({
    type: 'fetch:user',
    data: {
      uid: searchText.value.trim(),
    },
  }, window.origin)
}

useEventListener(window, 'message', ({ data }) => {
  if (!data.type?.startsWith('result:')) {
    return
  }

  result.value = data.data
})
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
