<script setup lang="ts">
import { message } from '@weibo-archiver/core'
import { ref } from 'vue'
import Weibo from '@/components/weibo/Weibo.vue'

const searchText = ref('')
const result = ref<any>({})

async function startFetch() {
  if (!searchText.value) {
    return
  }

  result.value = 'loading'
  message.sendMessage('fetch:posts', searchText.value)
}

message.onMessage('result:posts', user => result.value = user)
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
