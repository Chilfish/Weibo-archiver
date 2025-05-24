<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import Weibo from '@/components/weibo/Weibo.vue'

const searchText = ref('')
const result = ref<any>({})

async function startFetch() {
  if (!searchText.value) {
    return
  }

  result.value = 'loading'
  result.value = await sendMessage('fetch:posts', searchText.value)
}
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
    <div
      v-if="Array.isArray(result)"
    >
      <Weibo
        v-for="post in result"
        :key="post.id"
        :post="post"
      />
    </div>
  </main>
</template>
