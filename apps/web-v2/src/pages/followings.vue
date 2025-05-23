<script setup lang="ts">
import type { Following } from '@weibo-archiver/core'
import { computed, ref, watch } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import FollowingsTable from '@/components/followings/FollowingsTable.vue'
import SyncComparisonModal from '@/components/followings/SyncComparisonModal'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const followings = ref<Following[]>([])
const isLoading = ref(false)
const fetchedFollowings = ref<Following[]>([])
const openDialog = ref(false)

const newFollowings = computed(() => {
  if (fetchedFollowings.value.length < 1) {
    return []
  }

  const followingUids = new Set(followings.value.map(user => user.uid))
  return fetchedFollowings.value.filter(user => !followingUids.has(user.uid))
})
const removedFollowings = computed(() => {
  if (fetchedFollowings.value.length < 1) {
    return []
  }
  const fetchedFollowingUids = new Set(fetchedFollowings.value.map(user => user.uid))
  return followings.value.filter(user => !fetchedFollowingUids.has(user.uid))
})

watch(() => userStore.isLoadingUser, async (loading) => {
  if (loading)
    return
  isLoading.value = true
  followings.value = await userStore.getFollowings()
  isLoading.value = false
}, { immediate: true })

async function syncData() {
  console.log('sync')
  fetchedFollowings.value = await sendMessage<Following[]>('fetch:followings', { uid: userStore.curUid })
  openDialog.value = true
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
    >
      <p
        class="mr-4"
      >
        共有{{ followings.length }} 个关注
      </p>

      <Button
        variant="outline"
        size="sm"
        @click="syncData"
      >
        同步
      </Button>
    </FollowingsTable>

    <SyncComparisonModal
      :is-open="openDialog"
      :removed-followings="removedFollowings"
      :new-followings="newFollowings"
    />
  </main>
</template>
