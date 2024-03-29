<script setup lang="ts">
import type { UserBio } from '@types'
import Fuse from 'fuse.js'

const postStore = usePostStore()
const search = ref('')
const searchDebounced = useDebounce(search, 500)

const fuse = shallowRef<Fuse<UserBio> | null>(null)

const searchResults = computed(() => {
  if (!searchDebounced.value || !fuse.value)
    return postStore.followings

  return fuse.value
    .search(`'${searchDebounced.value}`)
    .map(result => result.item)
})

onBeforeMount(async () => {
  if (!postStore.followings.length)
    postStore.followings = await postStore.getFollowings()
  fuse.value = new Fuse(postStore.followings, {
    keys: ['name'],
  })
})
</script>

<template>
  <div
    v-if="postStore.followings.length"
    w="full md:40vw"
  >
    <n-input
      v-model:value="search"
      clearable
      placeholder="搜索关注列表"
      class="my-2 py-1"
    />

    <UserFollowingItem
      v-for="user in searchResults"
      :key="user.uid"
      :user="user"
    />
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
