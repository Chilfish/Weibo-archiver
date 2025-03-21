<script setup lang="ts">
import type { UserInfo } from '@workspace/shared'
import { ChevronDown, UserRoundPlus } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  users: UserInfo[]
  curUid?: string
}>()

const curUser = computed(() => props.users.find(user => user.uid === props.curUid))
const restUsers = computed(() => props.users.filter(user => user.uid !== props.curUid))
</script>

<template>
  <div class="dropdown w-fit">
    <div
      tabindex="0" role="button"
      class="btn w-full bg-base-100 text-gray-700 border-gray-200 hover:bg-gray-50 flex justify-between p-4 h-12"
    >
      <div
        v-if="curUser"
        class="flex items-center gap-2"
      >
        <div class="avatar">
          <div class="w-8 h-8 rounded-full">
            <img
              :src="curUser.avatar"
              :alt="curUser.name"
            >
          </div>
        </div>
        <span>{{ curUser.name }}</span>
      </div>
      <div
        v-else
        class="flex items-center gap-2"
      >
        <UserRoundPlus class="w-4 h-4" />
        导入数据后可切换用户
      </div>
      <ChevronDown class="w-4 h-4" />
    </div>

    <ul
      v-if="restUsers.length > 0"
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow-lg glassmorphism rounded-box w-full mt-2"
    >
      <li v-for="user in restUsers" :key="user.uid">
        <a class="flex items-center gap-2">
          <div class="avatar">
            <div class="w-8 h-8 rounded-full">
              <img
                :src="user.avatar"
                :alt="user.name"
              >
            </div>
          </div>
          <span>{{ user.name }}</span>
        </a>
      </li>
      <li class="mt-2 pt-2">
        <button class="btn btn-primary btn-ghost">
          <UserRoundPlus class="w-4 h-4" /> 添加新用户
        </button>
      </li>
    </ul>
  </div>
</template>
