<script setup lang="ts">
import { fetchFollowings } from '@shared'
import { Button } from '@workspace/ui/shadcn/button'
import { Progress } from '@workspace/ui/shadcn/progress'
import { useToast } from '@workspace/ui/shadcn/toast'

import { Minimize2 } from 'lucide-vue-next'

import { storeToRefs } from 'pinia'
import Config from './Config.vue'
import { useConfigStore, usePostStore } from './stores'

const toast = useToast()

const postStore = usePostStore()
const configStore = useConfigStore()

const isStart = ref(false)
const isStop = ref(false)
const isFinish = ref(false)
const isFetchingFollowings = ref(false)

const { config } = storeToRefs(configStore)

const percentage = computed(() => config.value.fetchedCount / postStore.total * 100 || 0)
const progressText = computed(() => `${config.value.fetchedCount}/${postStore.total} 条`)

const { pause, start } = fetchPosts({
  fetchOptions: () => ({
    ...config.value,
    savePost: post => postStore.add(post),
  }),
  setTotal: total => postStore.total = total,
  onFinish: async () => {
    if (!config.value.weiboOnly) {
      toast.success('获取完毕~，正在获取关注列表')
      isFetchingFollowings.value = true
      await fetchFollowings(
        config.value.uid,
        async data => postStore.addFollowings(data),
      )
    }

    await postStore.exportDatas()

    isStart.value = false
    isFinish.value = true
    config.value.curPage--
  },
})

async function startFetch() {
  toast.info('开始爬取中，请稍等~')

  await postStore.setDB()

  isStart.value = true
  isFinish.value = false
  isStop.value = false
  isFetchingFollowings.value = false

  // 如果只获取关注列表
  if (config.value.followingsOnly) {
    isFetchingFollowings.value = true
    await fetchFollowings(
      config.value.uid,
      async data => postStore.addFollowings(data),
    )
    await postStore.exportFollowings()
    isStart.value = false
    isFinish.value = true
    return
  }

  // 如果是重新开始，不保留上次 fetch 的状态
  if (!config.value.restore || !config.value.isFetchAll)
    await postStore.reset()

  await postStore.setCount()
  await postStore.setUser()

  await start()
}

(globalThis as any).fetchOptions = toRaw(config.value)

/**
 * 初始化用户信息
 */
async function init() {
  const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
  const { uid, name } = await userInfo({ id })

  postStore.userInfo = await userDetail(uid)
  console.log('userInfo', postStore.userInfo)
  configStore.setConfig({ uid, name })
}

onMounted(async () => {
  await init()
})

function toggleStop() {
  isStop.value = !isStop.value
  if (isStop.value)
    pause()
  else
    start()
}

const startButtonText = computed(() => {
  if (config.value.followingsOnly)
    return '获取关注列表'

  if (isStop.value)
    return `重新开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`

  return `开始获取 ${config.value.isFetchAll ? '全部' : '部分'} 微博`
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

    <h3 class="">
      用户名: @{{ config.name }}
    </h3>

    <Config />

    <div class="flex items-center gap-2">
      <Progress
        :model-value="percentage"
      />

      <div class="min-w-fit">
        {{ progressText }}
      </div>
    </div>
    <div class="flex gap-2">
      <Button
        v-show="!isStart || isStop"
        @click="startFetch"
      >
        {{ startButtonText }}
      </Button>

      <div
        v-show="isStart && !isFinish && !isStop"
        class="center"
      >
        正在获取{{ isFetchingFollowings ? '关注列表' : '微博' }} ~
      </div>

      <Button
        v-show="isStart && !isFinish"
        @click="toggleStop"
      >
        {{ isStop ? '继续' : '暂停' }}
      </Button>

      <Button
        v-show="isFinish || isStop"
        @click="postStore.exportDatas"
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
  right: 1rem; /* 16px */
  top: 5rem; /* 80px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem; /* 16px */
  border-radius: 0.5rem; /* 8px */
  padding: 1rem; /* 16px */
  background-color: white;
  color: black;
  transition: all 0.3s ease-in-out;
}
</style>
