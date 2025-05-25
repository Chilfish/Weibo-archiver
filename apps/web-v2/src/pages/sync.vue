<script setup lang="tsx">
import type { UserInfo } from '@weibo-archiver/core'
import { ref } from 'vue'
import StepIndicator from '@/components/sync/StepIndicator.vue'
import { UserSearch } from '@/components/sync/UserSearch'

const selectedUser = ref<UserInfo>()
const curStep = ref(1)

const steps = [
  { step: 1, title: '选择用户', description: '搜索并选择目标用户' },
  { step: 2, title: '配置选项', description: '选择备份内容和设置' },
  { step: 3, title: '开始备份', description: '执行备份任务' },
]
</script>

<template>
  <main
    class="my-0 mx-auto bg-secondary"
  >
    <div
      class="flex flex-col gap-8 items-center justify-center mx-auto p-8 sm:w-[70vw]"
    >
      <header class="w-full">
        <h1 class="text-3xl font-bold ">
          微博备份
        </h1>
        <p class="text-muted-foreground mt-2">
          备份并保存您的微博数据到本地
        </p>
      </header>

      <StepIndicator
        v-model:cur-step="curStep"
        :steps="steps"
      />

      <div
        v-if="curStep === 1"
        class="w-full"
      >
        <UserSearch
          @select-user="val => selectedUser = val"
        />
        <Button
          v-if="selectedUser"
          class="ml-auto mt-4 block"
          @click="curStep = 2"
        >
          下一步
        </Button>
      </div>

      <div
        v-if="curStep === 2"
      >
        {{ selectedUser }}
      </div>
    </div>
  </main>
</template>
