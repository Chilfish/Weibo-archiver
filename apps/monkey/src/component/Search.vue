<script setup lang="ts">
import type { User } from '@shared'
import { ArrowRight, Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import LazyImage from './LazyImage.vue'

const searchText = ref('')
const searchResult = ref<User[]>([])

const mockData: User[] = [
  {
    uid: 'uid-1',
    name: '张三',
    avatar: 'https://unavatar.io/github/chilfish',
  },
  {
    uid: 'uid-2',
    name: '李四三',
    avatar: 'https://unavatar.io/github/x',
  },
  {
    uid: 'uid-3',
    name: '王五',
    avatar: 'https://unavatar.io/github/x',
  },
  {
    uid: 'uid-4',
    name: '赵六',
    avatar: 'https://unavatar.io/github/x',
  },
]

function searchUser() {
  console.log(searchText.value)
  searchResult.value = mockData.filter(user =>
    user.name.includes(searchText.value)
    || user.uid.includes(searchText.value),
  )

  console.log(searchResult.value)
}

function setUser(user: User) {
  console.log(user)
  searchText.value = user.name
  searchResult.value = []
}

watch(searchText, (value) => {
  if (value.length === 0) {
    searchResult.value = []
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      for="wa-search-user"
      class="label"
    >
      搜索用户
    </label>
    <label class="input w-full">
      <Search
        class="h-[1em] cursor-pointer opacity-50"
        @click="searchUser"
      />
      <input
        id="wa-search-user"
        v-model="searchText"
        type="search"
        required
        placeholder="昵称或id"
        @keyup.enter="searchUser"
      >
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
            {{ user.uid }}
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
