<script setup lang="ts">
import type { UserInfo } from '@weibo-archiver/core'
import { ChevronDown, UserRoundPlus } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import ImportData from '@/components/common/ImportData.vue'
import { useUserStore } from '@/stores'
import Avatar from './common/Avatar.vue'

const props = defineProps<{
  users: UserInfo[]
}>()

const curUid = defineModel<string>('curUid')

const userStore = useUserStore()

const curUser = computed<UserInfo | undefined>(() => props.users.find(user => user.uid === curUid.value))
const restUsers = computed(() => props.users.filter(user => user.uid !== curUid.value))

watch(curUid, (newUid) => {
  if (newUid)
    userStore.setCurUid(newUid)
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        class="w-fit h-10"
      >
        <div
          v-if="curUser"
          class="flex items-center gap-2"
        >
          <Avatar
            :src="curUser.avatar"
            :alt="curUser.name"
            size="size-8"
          />
          <span class="max-w-22 truncate">
            {{ curUser.name }}
          </span>
        </div>
        <div
          v-else
          class="flex items-center gap-2"
        >
          <UserRoundPlus class="w-4 h-4" />
          暂无用户
        </div>
        <ChevronDown class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>已导入的用户列表</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup
        v-model="curUid"
      >
        <DropdownMenuRadioItem
          v-for="user in restUsers"
          :key="user.uid"
          :value="user.uid"
        >
          <Avatar
            :src="user.avatar"
            :alt="user.name"
            :size="8"
          />
          <span class="max-w-22 truncate">
            {{ user.name }}
          </span>
        </DropdownMenuRadioItem>

        <Button
          class="w-full relative"
          variant="ghost"
        >
          <ImportData />
          <UserRoundPlus class="w-4 h-4" /> 添加新用户
        </Button>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
