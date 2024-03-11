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

const { state: config } = storeToRefs(configStore)

const percentage = computed(() => postStore.posts.length / postStore.total * 100)
const progressText = computed(() => () => `${postStore.posts.length}/${postStore.total} 条`)

const pauseFn = ref<() => void>()
const resumeFn = ref<() => void>()

async function saveUserInfo() {
  const user = await userDetail(config.value.uid)
  user.exportedAt = Date.now().toLocaleString()

  const users = GM_getValue<any[]>('users') ?? []
  const index = users.findIndex((u: any) => u.uid === user.uid)
  if (index !== -1)
    users[index] = user
  else
    users.push(user)

  GM_setValue('users', users)

  message.success('用户信息同步成功')
}

async function exportDatas() {
  const res = await exportData(postStore.posts)
  if (!res)
    return
  const scripts = 'https://github.com/Chilfish/Weibo-archiver/raw/monkey/scripts.zip'
  saveAs(scripts, 'scripts.zip')

  await saveUserInfo()
}

async function start() {
  message.info('开始爬取中，请稍等~', {
    duration: 5000,
  })

  postStore.reset()
  isStart.value = true
  isFinish.value = false
  isStop.value = false

  const { pause, resume } = await fetchPosts({
    startPage: () => postStore.fetchedPage + 1,
    isFetchAll: config.value.isFetchAll,
    setTotal: total => postStore.total = total,
    addPosts: postStore.add,
    stopCondition: () => {
      const finished = postStore.fetchedPage >= postStore.pages

      if (finished) {
        isStart.value = false
        isFinish.value = true
        exportDatas()
      }
      return finished
    },
  })

  pauseFn.value = pause
  resumeFn.value = resume
}

watch(isStop, (val, oldVal) => {
  if (val === oldVal)
    return

  if (val)
    pauseFn.value?.()
  else
    resumeFn.value?.()
})

window.$message = useMessage()

onMounted(async () => {
  const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
  const username = document.URL.match(/\/n\/(.+)/)?.[1] ?? ''
  const { uid, name } = await userInfo({ id, name: decodeURIComponent(username) })

  configStore.initConfig()
  configStore.setConfig({
    uid,
    name,
  })
})
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="card w-34rem"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-5 text-black font-bold">
        Weibo archiver, user: {{ config.name }}
      </h2>

      <button
        title="最小化"
        @click="config.isMinimize = !config.isMinimize"
      >
        <i class="i-tabler:arrows-minimize icon" />
      </button>
    </div>
    <n-alert
      title="爬取过程中请勿刷新或关闭，否则导致已有的数据丢失而重头来过"
      type="warning"
      closable
    />

    <n-alert
      type="info"
    >
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

    <div class="btns flex gap-4">
      <button
        v-show="!isStart || (!isFinish && isStop)"
        @click="start"
      >
        {{ isStart ? '重新开始' : '开始' }}
        (获取 <strong>{{ config.isFetchAll ? '全部' : '部分' }}</strong> 微博)
      </button>

      <div
        v-show="isStart && !isFinish && !isStop"
        class="center"
      >
        获取中~
      </div>

      <button
        v-show="isStart"
        @click="isStop = !isStop"
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
    v-show="config.isMinimize"
    class="card minimize"
    @click="config.isMinimize = !config.isMinimize"
  >
    <img
      src="https://p.chilfish.top/weibo/icon.webp"
      alt="Weibo archiver logo"
      class="h-16 w-16"
    >
  </div>
</template>

<style scoped>
.card {
  position: fixed;
  right: 1rem; /* 16px */
  top: 5rem; /* 80px */
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem; /* 16px */
  border-radius: 0.5rem; /* 8px */
  padding: 1rem; /* 16px */
  background-color: white;
  color: black;
  transition: all 0.3s ease-in-out;
}

.minimize {
  width: 5rem;
  padding: 6px;
}
</style>
