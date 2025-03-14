<script setup lang="ts">
import { userDetail, userInfo } from '@shared'
import { onMounted } from 'vue'
import Header from './component/Header.vue'
import Options from './component/Options.vue'
import Search from './component/Search.vue'

import { config, useConfig } from './composables/useConfig'
import { fetchState, useFetch } from './composables/useFetch'
import { usePost } from './composables/usePost'

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
  // await init().catch(console.error)
  // await post.initializeDB()
})
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="fixed-card bg-base-200 w-96 gap-2 overflow-y-auto shadow-2xl space-y-2"
    data-theme="light"
  >
    <Header />
    <Search />
    <Options />
    <!-- <Config /> -->

    <div class="flex items-center gap-2">
      <progress
        :value="post.progress.value.percentage"
      />

      <div class="min-w-fit">
        {{ post.progress.value.fetchedCount }}/{{ config.total }}
      </div>
    </div>

    <div class="flex gap-2">
      <button
        v-show="!fetchState.isStart || fetchState.isStop"
        class="btn"
        @click="startFetch"
      >
        {{ startButtonText }}
      </button>

      <div
        v-show="fetchState.isStart && !fetchState.isFinish && !fetchState.isStop"
        class="center"
      >
        正在获取{{ fetchState.isFetchingFollowings ? '关注列表' : '微博' }} ~
      </div>

      <button
        v-show="fetchState.isStart && !fetchState.isFinish"
        class="btn"
        @click="toggleStop"
      >
        {{ fetchState.isStop ? '继续' : '暂停' }}
      </button>

      <button
        v-show="fetchState.isFinish || fetchState.isStop"
        class="btn"
        @click="post.exportAllData"
      >
        导出
      </button>
    </div>
  </div>

  <div
    v-show="config.isMinimize"
    class="fixed-card w-16 shadow-xl p-2!"
    @click="toggleMinimize"
  >
    <img
      src="https://p.chilfish.top/weibo/icon.webp"
      alt="Weibo archiver logo"
    >
  </div>
</template>

<style scoped>
#plugin-app {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 100%;
}

:root {
  font-size: 14px;
}

p {
  color: black !important;
}

.fixed-card {
  position: fixed;
  right: 1rem;
  top: 5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
  max-height: 80vh;
}
</style>
