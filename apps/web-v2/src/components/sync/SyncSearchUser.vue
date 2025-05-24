<script setup lang="tsx">
import type { UserInfo } from '@weibo-archiver/core'
import { formatNumber } from '@weibo-archiver/core'
import {
  ClockIcon,
  HeartIcon,
  SearchIcon,
  TargetIcon,
  UsersIcon,
  XIcon,
} from 'lucide-vue-next' // 假设你使用 lucide-vue-next
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'

const SearchIconQuery = ref('')
const SearchIconResults = ref([])
const selectedUser = ref(null)
const isSearchIconing = ref(false)
const dummyResults = [
  {
    uid: '123456789',
    name: 'weibo_user_1',
    avatar: 'https://via.placeholder.com/150',
    bio: '这是一个模拟的微博用户描述。',
    followers: 12345,
    followings: 678,
  },
  {
    uid: '987654321',
    name: 'wei_user',
    avatar: 'https://via.placeholder.com/150',
    bio: '这是另一个模拟用户。',
    followers: 5432,
    followings: 123,
  },
]
const handleSearchIcon = async () => {
  if (!SearchIconQuery.value.trim())
    return
  isSearchIconing.value = true
  SearchIconResults.value = [] // 清空之前的搜索结果
  selectedUser.value = null // 清空已选择用户

  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络延迟

    SearchIconResults.value = dummyResults.filter(user =>
      user.name.includes(SearchIconQuery.value),
    )
  }
  catch (error) {
    console.error('搜索失败:', error)
  }
  finally {
    isSearchIconing.value = false
  }
}

const handleSelectUser = (user) => {
  selectedUser.value = user
  SearchIconResults.value = []
}

const handleClearUser = () => {
  selectedUser.value = null
  SearchIconQuery.value = ''
}

const UserCard = ({ user }: { user: UserInfo }) => (
  <div class="flex items-center gap-4">
    <Avatar
      src={user.avatar}
      size="size-14"
      alt={user.name.slice(0, 6)}
    >
    </Avatar>
    <div class="flex-1">
      <div
        class="font-semibold text-gray-900 dark:text-white"
      >
        {user.name }
      </div>
      <p
        class="text-sm mb-3 leading-relaxed text-muted-foreground"
      >
        { user.bio }
      </p>
      <div class="flex items-center gap-4 text-xs">
        <div class="flex items-center gap-1 text-gray-500">
          <UsersIcon class="h-4 w-4" />
          <span>
            粉丝
            { formatNumber(user.followers) }
          </span>
        </div>
        <div class="flex items-center gap-1 text-gray-500">
          <HeartIcon class="h-4 w-4" />
          <span>
            关注
            { formatNumber(user.followings) }
          </span>
        </div>
      </div>
    </div>
  </div>
)
</script>

<template>
  <Card
    class="w-full p-0 gap-2 border-2 border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-shadow"
  >
    <CardHeader
      class="py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    >
      <CardTitle class="flex items-center gap-3">
        <div class="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <TargetIcon class="h-6 w-6 text-white" />
        </div>
        <div>
          <div class="text-xl">
            选择目标用户
          </div>
          <div class="text-sm font-normal text-gray-600 dark:text-gray-400">
            搜索并选择要备份的微博用户
          </div>
        </div>
      </CardTitle>
    </CardHeader>

    <CardContent class="py-4">
      <template v-if="!selectedUser">
        <form
          class="flex gap-3"
          @submit.prevent="handleSearchIcon"
        >
          <div
            class="flex-1 relative"
          >
            <SearchIcon class="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              v-model="SearchIconQuery"
              placeholder="输入微博用户名进行搜索..."
              class="pl-12 h-14 text-lg border-2 focus:border-blue-400"
            />
          </div>
          <Button
            :disabled="isSearchIconing"
            class="h-14 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            type="submit"
          >
            <template v-if="isSearchIconing">
              <ClockIcon class="mr-2 h-5 w-5 animate-spin" />
              搜索中
            </template>
            <template v-else>
              <SearchIcon class="mr-2 h-5 w-5" />
              搜索用户
            </template>
          </Button>
        </form>

        <!-- 搜索结果 -->
        <div
          v-if="SearchIconResults.length > 0"
          class=""
        >
          <Label class="text-lg font-medium py-4">搜索结果</Label>
          <div class="flex flex-col gap-3">
            <div
              v-for="user in SearchIconResults"
              :key="user.uid"
              class="px-3 py-2 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all duration-200 hover:shadow-lg"
              @click="handleSelectUser(user)"
            >
              <UserCard :user="user" />
            </div>
          </div>
        </div>
      </template>

      <!-- 已选择用户 -->
      <div
        v-else
        class="px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800"
      >
        <div class="flex items-center justify-between">
          <UserCard :user="selectedUser" />
          <Button
            variant="outline"
            size="sm"
            class="h-10"
            @click="handleClearUser"
          >
            <XIcon class="h-4 w-4 mr-1" />
            重新选择
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
