<script setup lang="ts">
import type { UserInfo } from '@weibo-archiver/core'
import { ArrowRight, Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useConfig } from '../composables/useConfig'
import { userService } from '../composables/useFetch'
import { usePost } from '../composables/usePost'
import LazyImage from './LazyImage.vue'

const { config } = useConfig()
const post = usePost()
const searchText = ref(config.value.user?.name || '')
const searchResult = ref<UserInfo[]>([])

async function searchUser() {
  const isUid = /^\d+$/.test(searchText.value)
  const users = isUid
    ? await userService.getDetail(searchText.value).then(user => [user])
    : await userService.searchUser(searchText.value)
  console.log(users)
  searchResult.value = users
}

async function setUser(user: UserInfo) {
  searchText.value = user.name
  searchResult.value = []
  config.value.user = user

  await post.updateUserInfo()
  await post.initializeDB()
}

function formatNumber(num: number) {
  if (num > 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return num
}

watch(searchText, (value) => {
  if (value.length === 0) {
    searchResult.value = []
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="input w-full">
      <span class="label">
        当前用户
      </span>
      <input
        id="wa-search-user"
        v-model="searchText"
        type="search"
        required
        placeholder="搜索昵称或数字 id"
        @keyup.enter="searchUser"
      >
      <Search
        class="h-[1em] cursor-pointer"
        @click="searchUser"
      />
    </label>

    <div
      v-if="searchResult.length"
      class="bg-base-100 max-h-56 flex flex-col gap-1 overflow-y-auto rounded-lg p-2"
    >
      <div
        v-for="user in searchResult"
        :key="user.uid"
        class="hover:bg-base-300 flex cursor-pointer items-center gap-2 rounded-lg p-2" @click="setUser(user)"
      >
        <div class="avatar">
          <LazyImage
            :src="user.avatar"
            :alt="user.name"
            class="h-8 w-8 rounded-full"
          />
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-bold">
            {{ user.name }}
          </div>
          <div class="text-xs text-gray-500">
            uid: {{ user.uid }}；粉丝：{{ formatNumber(user.followers) }}
          </div>
        </div>

        <a
          :href="`https://weibo.com/u/${user.uid}`"
          target="_blank"
          class="btn-link ml-auto btn"
        >
          <ArrowRight class="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
</template>
