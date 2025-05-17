<script setup lang="ts">
import type { Following } from '@weibo-archiver/core'
import FollowingsTable from '@/components/followings/FollowingsTable.vue'
import { useUserStore } from '@/stores'
import { ref, watch } from 'vue'

const userStore = useUserStore()
const followings = ref<Following[]>([])
const isLoading = ref(false)

watch(() => userStore.isLoadingUser, async (loading) => {
  if (loading)
    return
  isLoading.value = true
  followings.value = await userStore.getFollowings()
  isLoading.value = false
}, { immediate: true })
</script>

<template>
  <main>
    <h2
      class="font-bold text-xl"
    >
      关注列表管理
    </h2>
    <FollowingsTable :data="followings" />
  </main>
</template>
