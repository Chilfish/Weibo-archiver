<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import ExtensionStatusButton from '@/components/ExtensionStatusButton.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">
        插件状态检查示例
      </h2>
      <div class="flex flex-wrap gap-4">
        <ExtensionStatusButton
          variant="default"
          :show-status="true"
        />
        <ExtensionStatusButton
          variant="outline"
          size="sm"
          :show-status="false"
        />
        <Button
          v-extension-check="{
            autoCheck: false,
            showDialog: true,
            onConnected: () => console.log('手动检查: 插件已连接'),
            onDisconnected: () => console.log('手动检查: 插件未连接'),
          }"
          variant="secondary"
        >
          手动检查插件状态
        </Button>
      </div>
    </div>

    <div class="border-t pt-4 mt-8">
      <h2 class="text-xl font-semibold mb-4">
        微博获取测试
      </h2>
      <Button
        id="startFetch"
        class="w-fit"
        @click="startFetch"
      >
        Start fetch
      </Button>
      <Input
        v-model="searchText"
        class="mt-2"
      />
      <div
        v-if="Array.isArray(result)"
        class="mt-4"
      >
        <Weibo
          v-for="post in result"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </main>
</template>
