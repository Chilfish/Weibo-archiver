<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { users, curUid } = storeToRefs(usePublicStore())

const otherUsers = computed(() => users.value.filter(user => user.uid !== curUid.value))
const curUser = computed(() => users.value.find(user => user.uid === curUid.value))
</script>

<template>
  <div v-if="!curUser">
    暂无用户数据，先去导入吧
  </div>
  <tmeplate v-else>
    <div class="title">
      当前用户
    </div>

    <UserProfile
      class="w-full"
      :user="curUser"
    />

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
        class="transition-opacity btn"
        op="0 group-hover:100"
      >
        切换到该用户
      </button>
    </div>
  </tmeplate>
</template>

<style scoped>
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}
</style>
