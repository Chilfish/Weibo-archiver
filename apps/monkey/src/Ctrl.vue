<script setup lang="ts">
import { userDetail, userInfo } from '@shared'
import { Button } from '@workspace/ui/shadcn/button'
import { Progress } from '@workspace/ui/shadcn/progress'
import { Minimize2 } from 'lucide-vue-next'
import { onMounted } from 'vue'

import { config, useConfig } from './composables/useConfig'
import { fetchState, useFetch } from './composables/useFetch'
import { usePost } from './composables/usePost'
import Config from './Config.vue'

const { toggleMinimize, updateConfig } = useConfig()
const post = usePost()
const {
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

  post.userInfo.value = await userDetail(uid)
  console.log('userInfo', post.userInfo.value)
  updateConfig({ uid, name })
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
        @click="toggleMinimize"
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
        :model-value="post.progress.value.percentage"
      />

      <div class="min-w-fit">
        {{ post.progress.value.fetchedCount }}/{{ post.progress.value.total }}
      </div>
    </div>

    <div class="flex gap-2">
      <Button
        v-show="!fetchState.isStart || fetchState.isStop"
        @click="startFetch"
      >
        {{ startButtonText }}
      </Button>

      <div
        v-show="fetchState.isStart && !fetchState.isFinish && !fetchState.isStop"
        class="center"
      >
        正在获取{{ fetchState.isFetchingFollowings ? '关注列表' : '微博' }} ~
      </div>

      <Button
        v-show="fetchState.isStart && !fetchState.isFinish"
        @click="toggleStop"
      >
        {{ fetchState.isStop ? '继续' : '暂停' }}
      </Button>

      <Button
        v-show="fetchState.isFinish || fetchState.isStop"
        @click="post.exportAllData"
      >
        导出
      </Button>
    </div>
  </div>

  <div
    v-show="config.isMinimize"
    class="card w-16 shadow-xl p-2!"
    @click="toggleMinimize"
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
