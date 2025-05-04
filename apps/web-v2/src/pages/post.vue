<script setup lang="ts">
import { usePublicStore } from '@weibo-archiver/core'
import { onBeforeMount, useTemplateRef } from 'vue'
import WeiboList from '../components/weibo/WeiboList.vue'

const publicStore = usePublicStore()

onBeforeMount(async () => {
  publicStore.load()
  // publicStore.curUid = publicStore.users[0].uid

  console.log(publicStore.curUser)
})

const mainRef = useTemplateRef<HTMLElement>('mainRef')

function scrollToTop() {
  mainRef.value!.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <main
    ref="mainRef"
    class="flex flex-col relative w-full"
  >
    <WeiboList
      @reload="scrollToTop"
    />
  </main>
</template>
