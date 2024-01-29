<script setup lang="ts">
import { useMessage } from 'naive-ui'

const id = document.URL.match(/\/(\d+)/)?.[1] ?? ''
const name = document.URL.match(/\/n\/(.+)/)?.[1] ?? ''

const message = useMessage()
const userData = await fetchUser(id, name)
useUserStore().set(userData.id, userData.name)

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

async function fetch() {
  await postStore.fetchPosts(isStop)
  isFinish.value = true
}

async function start() {
  message.info('开始爬取中，请稍等~', {
    duration: 5000,
  })

  reset()
  await fetch()
}

watch(isStop, async () => {
  if (!isStop.value)
    await fetch()
})

// @ts-expect-error TODO: fix this
window.$message = useMessage()
</script>

<template>
  <div
    class="fixed right-4 top-20 z-999 w-36rem flex flex-col select-none justify-center gap-4 rounded-2 p-4 shadow-xl bg-white! text-black!"
  >
    <h2 class="text-5 text-black font-bold">
      Weibo archiver, user: {{ userData.name }}
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
      <button @click="start">
        {{ isFinish ? '重新开始' : '开始' }}
        (获取{{ configStore.isFetchAll ? '全部' : '部分' }}微博)
      </button>

      <button
        v-show="isStart"
        @click="isStop = !isStop"
      >
        {{ isStop ? '继续' : '暂停' }}
      </button>

      <button
        v-show="isFinish"
        @click="exportData(postStore.posts)"
      >
        导出
      </button>
    </div>
  </div>
</template>
