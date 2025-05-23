<script setup lang="ts">
import type { Following } from '@weibo-archiver/core'
import { ref, watch } from 'vue'
import FollowingsTable from '@/components/followings/FollowingsTable.vue'
import { useUserStore } from '@/stores'

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

async function syncData() {
  console.log('sync')
}
</script>

<template>
  <main>
    <h2
      class="font-bold text-xl"
    >
      关注列表管理
    </h2>
    <FollowingsTable
      :data="followings"
      @sync="syncData"
    />
  </main>
</template>
