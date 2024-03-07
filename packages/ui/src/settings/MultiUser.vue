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
    <div class="title">
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

  <NAlert
    v-else
    type="info"
    class="mt-4"
  >
    没找到其他已导入的用户？尝试在该用户的脚本页中点击 同步信息 后刷新本页即可获取
  </NAlert>

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
      class="transition-opacity btn"
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
