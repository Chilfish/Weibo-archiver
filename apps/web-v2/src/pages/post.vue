<script setup lang="ts">
import { usePublicStore } from '@weibo-archiver/core'
import { onBeforeMount } from 'vue'
import WeiboList from '../components/weibo/WeiboList.vue'

const publicStore = usePublicStore()

onBeforeMount(async () => {
  publicStore.load()
  // publicStore.curUid = publicStore.users[0].uid

  console.log(publicStore.curUser)
})
</script>

<template>
  <main
    class="flex flex-col relative"
  >
    <WeiboList />
  </main>
</template>
