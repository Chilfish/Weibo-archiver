<script setup lang="ts">
import { useUserStore } from '@/stores'
import { onBeforeMount, useTemplateRef } from 'vue'
import WeiboList from '../components/weibo/WeiboList.vue'

const userStore = useUserStore()

onBeforeMount(async () => {
  userStore.load()
  console.log(userStore.curUser)
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
