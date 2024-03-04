<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { saveAs } from 'file-saver'

import { exportData } from '@core/utils'
import { useConfigStore, usePostStore } from './stores'
import Config from './Config.vue'

const message = useMessage()

const postStore = usePostStore()
const configStore = useConfigStore()

const isStart = ref(false)
const isStop = ref(false)
const isFinish = ref(false)

const percentage = computed(() => postStore.posts.length / postStore.total * 100)
const progressText = computed(() => () => `${postStore.posts.length}/${postStore.total} 条`)

const pauseFn = ref<() => void>()
const resumeFn = ref<() => void>()

async function exportDatas() {
  const res = await exportData(postStore.posts)
  if (!res)
    return
  const scripts = 'https://github.com/Chilfish/Weibo-archiver/raw/monkey/scripts.zip'
  saveAs(scripts, 'scripts.zip')
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
    isFetchAll: configStore.state.isFetchAll,
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

  configStore.setConfig({
    uid,
    name,
  })
})
</script>

<template>
  <div
    class="fixed right-4 top-20 z-999 w-36rem flex flex-col select-none justify-center gap-4 rounded-2 p-4 shadow-xl bg-white! text-black!"
  >
    <h2 class="text-5 text-black font-bold">
      Weibo archiver, user: {{ configStore.state.name }}
    </h2>

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
        (获取 <strong>{{ configStore.state.isFetchAll ? '全部' : '部分' }}</strong> 微博)
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
    </div>
  </div>
</template>
