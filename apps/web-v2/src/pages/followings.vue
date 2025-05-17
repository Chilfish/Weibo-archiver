<script setup lang="ts">
import type { Following } from '@weibo-archiver/core'
import FollowingsTable from '@/components/followings/FollowingsTable.vue'
import { useUserStore } from '@/stores'
import { onBeforeMount, ref } from 'vue'

const userStore = useUserStore()
const followings = ref<Following[]>([])
const isLoading = ref(false)

onBeforeMount(async () => {
  isLoading.value = true
  followings.value = await userStore.getFollowings()
  isLoading.value = false
})
</script>

<template>
  <main>
    <FollowingsTable :data="followings" />
  </main>
</template>
