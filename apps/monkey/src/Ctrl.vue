<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { exportData } from './utils'
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

function reset() {
  postStore.reset()
  isStart.value = true
  isFinish.value = false
  isStop.value = false
}

let pauseFetch = () => {}
let resumeFetch = async () => {}

async function fetch() {
  const { pause, resume } = await postStore.fetchPosts(configStore.state)
  pauseFetch = pause
  resumeFetch = resume
}

function start() {
  message.info('开始爬取中，请稍等~', {
    duration: 5000,
  })

  reset()
  fetch()
}

watchEffect(() => {
  if (isStop.value)
    pauseFetch()
  else
    resumeFetch()

  if (postStore.fetchedPage >= postStore.pages) {
    isStart.value = false
    isFinish.value = true
    exportData(postStore.posts)
  }
})

// @ts-expect-error TODO: fix this
window.$message = useMessage()

onMounted(async () => {
  const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
  const username = document.URL.match(/\/n\/(.+)/)?.[1] ?? ''
  const { uid, name } = await userInfo(id, username)

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
      title="爬取过程中请勿刷新或关闭，否则导致已有的数据丢失而不得不重头来过"
      type="warning"
      closable
    />

    <Config />

    <n-progress
      type="line"
      :percentage="percentage"
    >
      {{ progressText() }}
    </n-progress>

    <div class="btns flex gap-4">
      <button
        v-show="!isStart"
        @click="start"
      >
        {{ isFinish ? '重新开始' : '开始' }}
        (获取{{ configStore.state.isFetchAll ? '全部' : '部分' }}微博)
      </button>

      <div
        v-show="isStart && !isFinish"
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
        @click="exportData(postStore.posts)"
      >
        导出
      </button>
    </div>
  </div>
</template>
