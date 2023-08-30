<script setup lang="ts">
import { render } from 'vue'
import PreviewVue from './Preview.vue'

const id = document.URL.match(/\/(\d+)/)?.[1] || ''
const name = document.URL.match(/\/n\/(.+)/)?.[1] || ''

const userData = await fetchUser(id, name)
useUserStore().set(userData.id, userData.name)

const postStore = usePostStore()

const dateRange = ref([] as Date[])
const isStart = ref(false)
const isStop = ref(false)
const isFinish = ref(false)
const isFetchAll = computed(() => dateRange.value?.length === 0 || !dateRange.value)

const percentage = computed(() => postStore.posts.length / postStore.total * 100)
const progressText = computed(() => () => `${postStore.posts.length}/${postStore.total} 条`)

async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = document.querySelector('#app')
  if (app) {
    app.innerHTML = ''
    app.appendChild(container.firstElementChild!)
  }
}

async function start() {
  ElMessage.info({
    message: '开始爬取中，请稍等~',
    duration: 5000,
  })
  postStore.reset()
  await preview()

  if (isFetchAll.value) {
    isStart.value = true
    await postStore.fetchAll(isStop)
    return (isFinish.value = true)
  }

  const [start, end] = dateRange.value
  isStart.value = true
  await postStore.fetchRange(start, end, isStop)
  isFinish.value = true
}

watch(isStop, async () => {
  const [start, end] = dateRange.value
  if (!isStop.value) {
    isFetchAll.value
      ? await postStore.fetchAll(isStop)
      : await postStore.fetchRange(start, end, isStop)
    isFinish.value = true
  }
})
</script>

<template>
  <div
    class="fixed right-4 top-20 z-9999 w-32rem flex flex-col select-none justify-center gap-4 rounded-2 bg-white p-4 text-black shadow-xl"
  >
    <h2 class="text-5 font-bold">
      Weibo archiver, user: {{ userData.name }}
    </h2>

    <el-alert title="爬取过程中请勿刷新或关闭，否则导致已有的数据丢失而不得不重头来过" type="warning" />

    <p>请选择要存档的范围，默认为从头到尾</p>

    <!-- @ts-expect-error -->
    <!-- @vue-expect-error -->
    <el-date-picker
      v-model="dateRange"
      unlink-panels type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      range-separator="到" :shortcuts="shortcuts"
    />

    <el-progress :percentage="percentage" :format="progressText" />

    <div class="btns flex gap-4">
      <button @click="start">
        {{ isFinish ? '重新开始' : '开始' }}
      </button>

      <button v-show="isStart" @click="isStop = !isStop">
        {{ isStop ? '继续' : '暂停' }}
      </button>

      <button
        v-show="isFinish"
        @click="exportData(postStore.posts, userData.id)"
      >
        导出
      </button>
    </div>
  </div>
</template>
