<script setup lang="tsx">
import type {
  Favorite,
  FetchConfig,
  Following,
  Post,
  UserInfo,
} from '@weibo-archiver/core'
import type { Status } from '@/components/sync/FetchStatus'
import { useStorage } from '@vueuse/core'
import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { onBeforeMount, reactive, ref } from 'vue'
import { onMessage, sendMessage } from 'webext-bridge/window'
import StepIndicator from '@/components/common/StepIndicator.vue'
import { ArchiveConfiguration } from '@/components/sync/ArchiveConfiguration'
import { FetchStatus } from '@/components/sync/FetchStatus'
import { UserSearch } from '@/components/sync/UserSearch'
import { usePostStore, useUserStore } from '@/stores'

const selectedUser = ref<UserInfo>()
const curStep = ref(1)
const fetchConfig = useStorage<FetchConfig>('fetch-config', { ...DEFAULT_FETCH_CONFIG })
const fetchingStatus = ref<Status>('preparing')

const postStore = usePostStore()
const userStore = useUserStore()

const fetchCount = reactive({
  posts: 0,
  favorites: 0,
  followers: 0,
})

const steps = [
  { step: 1, title: '选择用户', description: '搜索并选择目标用户' },
  { step: 2, title: '配置选项', description: '选择备份内容和设置' },
  { step: 3, title: '开始备份', description: '执行备份任务' },
]

async function startArchive() {
  if (!selectedUser.value) {
    return
  }

  curStep.value = 3

  if (!fetchConfig.value.restore) {
    fetchConfig.value.curPage = 1
    fetchConfig.value.sinceId = ''
  }

  await userStore.importUser(selectedUser.value)

  if (fetchConfig.value.hasWeibo) {
    await sendMessage('fetch:all-posts', {
      ...fetchConfig.value,
      uid: selectedUser.value.uid,
    })
  }

  if (fetchConfig.value.hasFollowings) {
    const data = await sendMessage<Following[]>('fetch:followings', { uid: selectedUser.value.uid })
    await userStore.updateFollowings(data, [])
    fetchCount.followers = data.length
  }

  if (fetchConfig.value.hasFavorites) {
    await sendMessage('fetch:favorites', {
      uid: selectedUser.value.uid,
    })
  }

  fetchingStatus.value = 'completed'
}

onMessage<{
  posts: Post[]
  page: number
  sinceId: string
}>('fetch:all-posts-paged', async ({ data }) => {
  console.log(data)
  fetchConfig.value.curPage = data.page
  fetchConfig.value.sinceId = data.sinceId
  await postStore.saveWeibo(data.posts)
  fetchCount.posts = await postStore.getAllPostsTotal()
})

onMessage<Favorite[]>('fetch:favorites-paged', async ({ data }) => {
  console.log(data)

  await postStore.saveFavorites(data)
  fetchCount.favorites = await postStore.getAllFavoritesTotal()
})

onBeforeMount(async () => {
  fetchCount.posts = await postStore.getAllPostsTotal()
  fetchCount.followers = await userStore.getFollowingsCount()
  fetchCount.favorites = await postStore.getAllFavoritesTotal()
})
</script>

<template>
  <div
    class="my-0 mx-auto bg-secondary"
  >
    <header class="w-full p-6">
      <h1 class="text-3xl font-bold ">
        微博备份
      </h1>
      <p class="text-muted-foreground mt-2">
        备份并保存您的微博数据到本地
      </p>
    </header>
    <main
      class="flex flex-col gap-8 items-center justify-center mx-auto pb-8 px-4 lg:p-8 lg:w-[70vw]"
    >
      <StepIndicator
        v-model:cur-step="curStep"
        :steps="steps"
      />

      <UserSearch
        v-if="curStep === 1"
        @select-user="val => selectedUser = val"
        @next-step="curStep = 2"
      />

      <ArchiveConfiguration
        v-if="curStep === 2"
        :user="selectedUser"
        :config="fetchConfig"
        @back="curStep = 1"
        @start-archive="startArchive"
      />

      <FetchStatus
        v-if="curStep === 3"
        :config="fetchConfig"
        :stats="fetchCount"
        :status="fetchingStatus"
      />
    </main>
  </div>
</template>
