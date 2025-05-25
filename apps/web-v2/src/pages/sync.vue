<script setup lang="tsx">
import type { UserInfo } from '@weibo-archiver/core'
import { ref } from 'vue'
import { UserSearch } from '@/components/sync/UserSearch'

const selectedUser = ref<UserInfo>()
</script>

<template>
  <main
    class="my-0 mx-auto bg-secondary"
  >
    <div
      class="flex flex-col gap-6 items-center justify-center mx-auto p-8 sm:w-[70vw]"
    >
      <div class="w-full">
        <h1 class="text-3xl font-bold text-gray-900">
          微博备份
        </h1>
        <p class="text-gray-600 mt-2">
          备份并保存您的微博数据到本地
        </p>
      </div>

      <UserSearch
        @select-user="val => selectedUser = val"
      />
      <Button
        v-if="selectedUser"
        class="ml-auto"
      >
        下一步
      </Button>
    </div>
  </main>
</template>
