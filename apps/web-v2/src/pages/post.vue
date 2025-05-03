<script setup lang="ts">
import { usePublicStore } from '@weibo-archiver/core'
import { onBeforeMount } from 'vue'
import BackToTop from '../components/common/BackToTop.vue'
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
    class="flex flex-col pb-4 md:py-8 md:px-12 lg:px-52 relative"
  >
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="flex flex-col gap-4 w-full">
        <FilterBar
          class="sticky top-0 self-start"
        />
        <WeiboList />
      </div>
      <div class="flex flex-col gap-4 sticky top-4 self-start px-8 w-full md:w-fit">
        <SwitchUser
          class="w-full"
          :users="publicStore.users"
          :cur-uid="publicStore.curUid"
        />
        <ProfilePanel :user="publicStore.curUser" />
      </div>
    </div>
    <BackToTop />
  </main>
</template>
