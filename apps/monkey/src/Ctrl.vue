<script setup lang="ts">
import { fetchFollowings } from '@shared'
import { useMessage } from 'naive-ui'

import { storeToRefs } from 'pinia'
import Config from './Config.vue'
import { useConfigStore, usePostStore } from './stores'

const message = useMessage()

const postStore = usePostStore()
const configStore = useConfigStore()

const isStart = ref(false)
const isStop = ref(false)
const isFinish = ref(false)
const isFetchingFollowings = ref(false)

const { config } = storeToRefs(configStore)

const percentage = computed(() => config.value.fetchedCount / postStore.total * 100)
const progressText = computed(() => () => `${config.value.fetchedCount}/${postStore.total} 条`)

const { pause, start } = fetchPosts({
  fetchOptions: () => ({
    ...config.value,
    savePost: post => postStore.add(post),
  }),
  setTotal: total => postStore.total = total,
  onFinish: async () => {
    if (!config.value.weiboOnly) {
      message.success('获取完毕~，正在获取关注列表')
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
  message.info('开始爬取中，请稍等~', {
    duration: 5000,
  })

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

window.$message = message;
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

      <button
        title="最小化"
        @click="configStore.toggleMinimize"
      >
        <i class="i-tabler:arrows-minimize icon" />
      </button>
    </div>

    <h3 class="">
      用户名: @{{ config.name }}
    </h3>

    <n-alert type="info">
      <p>
        导出完毕后，可在
        <a
          href="https://weibo.chilfish.top"
          target="_blank"
        >
          预览页
        </a>
        中导入数据查看
      </p>
    </n-alert>

    <Config />

    <n-progress
      type="line"
      :percentage="percentage"
    >
      {{ progressText() }}
    </n-progress>

    <div class="btns flex gap-2">
      <button
        v-show="!isStart || isStop"
        @click="startFetch"
      >
        {{ startButtonText }}
      </button>

      <div
        v-show="isStart && !isFinish && !isStop"
        class="center"
      >
        正在获取{{ isFetchingFollowings ? '关注列表' : '微博' }} ~
      </div>

      <button
        v-show="isStart && !isFinish"
        @click="toggleStop"
      >
        {{ isStop ? '继续' : '暂停' }}
      </button>

      <button
        v-show="isFinish || isStop"
        @click="postStore.exportDatas"
      >
        导出
      </button>
    </div>
  </div>

  <div
    class="card minimize shadow-xl"
    @click="configStore.toggleMinimize"
  >
    <img
      src="https://p.chilfish.top/weibo/icon.webp"
      alt="Weibo archiver logo"
      class="h-14 w-14"
    >
  </div>
</template>

<style scoped>
@import url('./reset.css');

p {
  color: black !important;
}

.card {
  position: fixed;
  right: 1rem; /* 16px */
  top: 5rem; /* 80px */
  z-index: 999;
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

.minimize {
  z-index: 0;
  padding: 6px;
}
</style>
