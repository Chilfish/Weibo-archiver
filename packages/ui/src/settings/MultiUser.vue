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
  <div
    v-else
    class=""
  >
    <UserProfile
      class="w-full"
      :user="curUser"
    />

    <NDivider v-if="otherUsers.length">
      其他用户
    </NDivider>

    <UserProfile
      v-for="user in otherUsers"
      :key="user.uid"
      :user="user"
      :show-more="false"
    />
  </div>
</template>
