<script setup lang="ts">
import type { Following } from '@weibo-archiver/core'
import { Loader2Icon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import FollowingsTable from '@/components/followings/FollowingsTable.vue'
import SyncComparisonModal from '@/components/followings/SyncComparisonModal'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const followings = ref<Following[]>([])
const isSyncLoading = ref(false)
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
  followings.value = await userStore.getFollowings()
}, { immediate: true })

async function syncData() {
  isSyncLoading.value = true
  fetchedFollowings.value = await sendMessage<Following[]>('fetch:followings', { uid: userStore.curUid })
  openDialog.value = true
}

async function onConfirm([selectedAdd, selectedRemove]: [Following[], Following[]]) {
  followings.value = [...followings.value, ...selectedAdd]
  followings.value = followings.value.filter(user => !selectedRemove.some(seletedUser => seletedUser.uid === user.uid))

  await userStore.updateFollowings(selectedAdd, selectedRemove)
  isSyncLoading.value = false
}

async function onCloseDialog() {
  openDialog.value = false
  isSyncLoading.value = false
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
        共有
        <span
          class="text-primary font-bold"
        >
          {{ followings.length }}
        </span>
        个关注
      </p>

      <Button
        variant="outline"
        size="sm"
        :disabled="isSyncLoading"
        @click="syncData"
      >
        <Loader2Icon
          v-if="isSyncLoading"
          class="w-4 h-4 mr-2 animate-spin"
        />
        同步
      </Button>
    </FollowingsTable>

    <SyncComparisonModal
      :is-open="openDialog"
      :removed-followings="removedFollowings"
      :new-followings="newFollowings"
      @confirm="onConfirm"
      @update:is-open="onCloseDialog"
    />
  </main>
</template>
