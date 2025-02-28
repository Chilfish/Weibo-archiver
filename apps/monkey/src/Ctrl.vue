<script setup lang="ts">
import { userDetail, userInfo } from '@shared'
import { Button } from '@workspace/ui/shadcn/button'
import { Progress } from '@workspace/ui/shadcn/progress'
import { Minimize2 } from 'lucide-vue-next'

import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useFetch } from './composables/useFetch'
import Config from './Config.vue'
import { useConfigStore, usePostStore } from './stores'

const configStore = useConfigStore()
const postStore = usePostStore()
const { config } = storeToRefs(configStore)
const { progress } = storeToRefs(postStore)
const {
  state,
  startButtonText,
  startFetch,
  toggleStop,
} = useFetch()

/**
 * 初始化用户信息
 */
async function init() {
  const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
  const { uid, name } = await userInfo({ id })

  postStore.userInfo = await userDetail(uid)
  console.log('userInfo', postStore.userInfo)
  configStore.updateConfig({ uid, name })
}

onMounted(async () => {
  await init()
})

const {
  VITE_APP_VERSION,
} = import.meta.env
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="card w-32rem shadow-xl"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-5 text-black font-bold">
        Weibo archiver <span class="ml-1 text-3">(v{{ VITE_APP_VERSION }})</span>
      </h2>

      <Button
        title="最小化"
        variant="ghost"
        @click="configStore.toggleMinimize"
      >
        <Minimize2 />
      </Button>
    </div>

    <h3>
      用户名: @{{ config.name }}
    </h3>

    <Config />

    <div class="flex items-center gap-2">
      <Progress
        :model-value="progress.percentage"
      />

      <div class="min-w-fit">
        {{ progress.fetchedCount }}/{{ progress.total }}
      </div>
    </div>

    <div class="flex gap-2">
      <Button
        v-show="!state.isStart || state.isStop"
        @click="startFetch"
      >
        {{ startButtonText }}
      </Button>

      <div
        v-show="state.isStart && !state.isFinish && !state.isStop"
        class="center"
      >
        正在获取{{ state.isFetchingFollowings ? '关注列表' : '微博' }} ~
      </div>

      <Button
        v-show="state.isStart && !state.isFinish"
        @click="toggleStop"
      >
        {{ state.isStop ? '继续' : '暂停' }}
      </Button>

      <Button
        v-show="state.isFinish || state.isStop"
        @click="postStore.exportAllData"
      >
        导出
      </Button>
    </div>
  </div>

  <div
    v-show="config.isMinimize"
    class="card w-16 shadow-xl p-2!"
    @click="configStore.toggleMinimize"
  >
    <img
      src="https://p.chilfish.top/weibo/icon.webp"
      alt="Weibo archiver logo"
    >
  </div>
</template>

<style scoped>
p {
  color: black !important;
}

.card {
  position: fixed;
  right: 1rem;
  top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
  color: black;
  transition: all 0.3s ease-in-out;
}
</style>
