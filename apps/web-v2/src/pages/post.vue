<script setup lang="ts">
import { users, weiboPosts } from '../stories/test.data'

const curUser = users[0]
</script>

<template>
  <main class="flex flex-col py-4 lg:px-48 bg-base-200">
    <FilterBar />
    <div class="flex gap-36">
      <div class="w-full space-y-4">
        <Weibo v-for="post in weiboPosts" :key="post.id" :post="post" />
      </div>
      <div class="flex flex-col gap-4 sticky top-20 self-start">
        <SwitchUser
          class="w-full"
          :users="users"
          :cur-uid="curUser.uid"
        />
        <ProfilePanel :user="curUser" />
      </div>
    </div>
  </main>
</template>
