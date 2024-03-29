<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { otherUsers, curUid, curUser, users } = storeToRefs(usePublicStore())

function switchUser(uid: string) {
  curUid.value = uid
}
</script>

<template>
  <div v-if="!users.length">
    暂无用户数据，先去导入吧
  </div>

  <tmeplate v-if="curUser">
    <div class="title sm:w-35vw">
      当前用户
    </div>

    <UserProfile :user="curUser" />
  </tmeplate>

  <div
    v-if="otherUsers.length"
    class="title mt-4"
  >
    其他用户
  </div>

  <div
    v-for="user in otherUsers"
    :key="user.uid"
    class="group flex items-center justify-between"
  >
    <UserProfile
      :user="user"
      :show-more="false"
    />

    <button
      class="text-3 transition-opacity btn sm:text-4"
      op="0 group-hover:100"
      @click="switchUser(user.uid)"
    >
      切换到该用户
    </button>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}
</style>
