<script setup lang="tsx">
import type { FetchConfig, UserInfo } from '@weibo-archiver/core'
import type { Status } from '@/components/sync/FetchStatus'
import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { reactive, ref } from 'vue'
import { onMessage } from 'webext-bridge/window'
import StepIndicator from '@/components/common/StepIndicator.vue'
import { ArchiveConfiguration } from '@/components/sync/ArchiveConfiguration'
import { FetchStatus } from '@/components/sync/FetchStatus'
import { UserSearch } from '@/components/sync/UserSearch'

const selectedUser = ref<UserInfo>()
const curStep = ref(1)
const fetchConfig = reactive<FetchConfig>({ ...DEFAULT_FETCH_CONFIG })
const fetchingStatus = ref<Status>('fetching')

const steps = [
  { step: 1, title: '选择用户', description: '搜索并选择目标用户' },
  { step: 2, title: '配置选项', description: '选择备份内容和设置' },
  { step: 3, title: '开始备份', description: '执行备份任务' },
]

async function startArchive() {
  curStep.value = 3

  setTimeout(() => fetchingStatus.value = 'completed', 1000)
}

const fetchCount = ref({
  posts: 0,
  favorites: 0,
  followers: 0,
})
onMessage<{
  posts: number
  favorites: number
  followers: number
}>('state:fetch-all', ({ data }) => {
  fetchCount.value = data
})
</script>

<template>
  <div
    class="my-0 mx-auto bg-secondary"
  >
    <header class="w-full p-6">
      <h1 class="text-3xl font-bold ">
        微博备份
      </h1>
      <p class="text-muted-foreground mt-2">
        备份并保存您的微博数据到本地
      </p>
    </header>
    <main
      class="flex flex-col gap-8 items-center justify-center mx-auto p-8 sm:w-[70vw]"
    >
      <StepIndicator
        v-model:cur-step="curStep"
        :steps="steps"
      />

      <UserSearch
        v-if="curStep === 1"
        @select-user="val => selectedUser = val"
        @next-step="curStep = 2"
      />

      <ArchiveConfiguration
        v-if="curStep === 2"
        :user="selectedUser"
        :config="fetchConfig"
        @back="curStep = 1"
        @start-archive="startArchive"
      />

      <FetchStatus
        v-if="curStep === 3 && selectedUser"
        :config="fetchConfig"
        :user="selectedUser"
        :stats="fetchCount"
        :status="fetchingStatus"
      />
    </main>
  </div>
</template>
