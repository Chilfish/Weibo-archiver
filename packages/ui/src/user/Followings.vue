<script setup lang="ts">
import type { UserBio } from '@shared'
import Fuse from 'fuse.js'

const postStore = usePostStore()
const search = ref('')
const searchDebounced = useDebounce(search, 500)

const fuse = shallowRef<Fuse<UserBio> | null>(null)

const searchResults = computed(() => {
  if (!searchDebounced.value || !fuse.value)
    return postStore.followings

  return fuse.value
    .search(`${searchDebounced.value}`)
    .map(result => result.item)
})

onMounted(() => {
  fuse.value = new Fuse(postStore.followings, {
    keys: ['name', 'remark'],
    ignoreLocation: true,
    includeScore: true,
    useExtendedSearch: true,
  })
})
</script>

<template>
  <div
    v-if="postStore.followings.length"
    w="full md:45vw"
  >
    <div
      class="text-gray-500"
    >
      共有 {{ searchResults.length }} 条结果
    </div>

    <n-input
      v-model:value="search"
      clearable
      placeholder="搜索关注列表"
      class="my-2 py-1"
    />

    <n-virtual-list
      style="max-height: 60dvh"
      item-resizable
      :item-size="64"
      :items="searchResults"
    >
      <template #default="{ item: user }">
        <UserFollowingItem
          :key="user.uid"
          :user="user"
        />
      </template>
    </n-virtual-list>
  </div>

  <div
    v-else
    class="min-h-30vh center"
  >
    <n-empty
      description="暂未导入关注列表"
      size="huge"
    />
  </div>
</template>
