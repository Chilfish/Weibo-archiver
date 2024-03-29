<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { saveAs } from 'file-saver'
import { storeToRefs } from 'pinia'

import { exportData } from '@core/utils'
import { useConfigStore, usePostStore } from './stores'
import Config from './Config.vue'

const message = useMessage()

const postStore = usePostStore()
const configStore = useConfigStore()

const isStart = ref(false)
const isStop = ref(false)
const isFinish = ref(false)

const { config } = storeToRefs(configStore)

const percentage = computed(() => config.value.fetchedCount / postStore.total * 100)
const progressText = computed(() => () => `${config.value.fetchedCount}/${postStore.total} 条`)

/**
 * 保存用户信息，以在预览页中获取这些信息
 */
async function saveUserInfo() {
  const user = await userDetail(config.value.uid)
  user.exportedAt = new Date().toLocaleString()

  const users = GM_getValue<any[]>('users') ?? []
  const index = users.findIndex((u: any) => u.uid === user.uid)
  if (index !== -1)
    Object.assign(users[index], user)
  else
    users.push(user)

  GM_setValue('users', users)

  console.log('已同步的用户信息', users)
  message.success('用户信息同步成功')
}

/**
 * 导出数据
 */
async function exportDatas() {
  const posts = await postStore.getAll()
  console.log('导出的数量：', posts.length)

  const res = await exportData(posts, postStore.userInfo)
  if (!res)
    return
  const scripts = 'https://github.com/Chilfish/Weibo-archiver/raw/monkey/scripts.zip'
  saveAs(scripts, 'scripts.zip')

  await saveUserInfo()
}

const { pause, start } = fetchPosts({
  fetchOptions: () => ({
    ...config.value,
    savePost: post => postStore.add(post),
  }),
  setTotal: total => postStore.total = total,
  onFinish: async () => {
    isStart.value = false
    isFinish.value = true
    config.value.curPage--
    exportDatas()
  },
})

async function startFetch() {
  message.info('开始爬取中，请稍等~', {
    duration: 5000,
  })

  postStore.setDB()
  await postStore.setCount()

  // 如果是重新开始，不保留上次 fetch 的状态
  if (!config.value.restore || !config.value.isFetchAll)
    await postStore.reset()

  await postStore.setUser()

  isStart.value = true
  isFinish.value = false
  isStop.value = false
  start()
}

window.$message = message

/**
 * 初始化用户信息
 */
async function init() {
  const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
  const username = document.URL.match(/\/n\/(.+)/)?.[1] ?? ''
  const { uid, name } = await userInfo({ id, name: decodeURIComponent(username) })

  postStore.userInfo = await userDetail(uid)
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
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="card w-32rem shadow-xl"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-5 text-black font-bold">
        Weibo archiver, user: {{ config.name }}
      </h2>

      <button
        title="最小化"
        @click="configStore.toggleMinimize"
      >
        <i class="i-tabler:arrows-minimize icon" />
      </button>
    </div>

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
        {{ isStop ? '重新' : '' }}开始获取 <strong>{{ config.isFetchAll ? '全部' : '部分' }}</strong> 微博
      </button>

      <div
        v-show="isStart && !isFinish && !isStop"
        class="center"
      >
        获取中~
      </div>

      <button
        v-show="isStart && !isFinish"
        @click="toggleStop"
      >
        {{ isStop ? '继续' : '暂停' }}
      </button>

      <button
        v-show="isFinish || isStop"
        @click="exportDatas"
      >
        导出
      </button>

      <button
        @click="saveUserInfo"
      >
        同步信息
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
