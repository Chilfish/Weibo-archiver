<script setup lang="ts">
import { usePostStore, usePublicStore } from '@weibo-archiver/core'
import { onMounted } from 'vue'

const postStore = usePostStore()
const publicStore = usePublicStore()

onMounted(async () => {
  publicStore.load()
  publicStore.curUid = publicStore.users[0].uid

  console.log(publicStore.curUser)

  await postStore.init()
  await postStore.get(1).then(res => res.map(post => ({
    ...post,
    user: publicStore.curUser,
  })))
})
</script>

<template>
  <main class="flex flex-col py-8 md:px-12 lg:px-52 bg-base-200">
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="w-full space-y-4">
        <FilterBar />
        <Weibo v-for="post in postStore.weibos" :key="post.id" :post="post" />
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
  </main>
</template>
