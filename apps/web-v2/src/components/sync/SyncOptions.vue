<script setup lang="ts">
import {
  BarChart3,
  Bookmark,
  Calendar,
  Clock,
  Download,
  Heart,
  ImageIcon,
  MessageCircle,
  Repeat,
  Star,
} from 'lucide-vue-next' // 假设你使用 lucide-vue-next
import { ref } from 'vue'

// 假设 config 是一个响应式对象，用于存储配置
// 替换为你的实际 CrawlConfig 类型和初始值
const config = ref({
  exportMicroblogs: true,
  exportAllWeibo: false,
  includeReposts: true,
  includeRepostImages: false,
  includeComments: false,
  exportFavorites: false,
  exportFollowingList: false,
  continueFromLast: false,
  commentCount: '10', // 默认值
  startDate: '',
  endDate: '',
})

// 开关选项的数据结构
const switchOptions = [
  { key: 'exportMicroblogs', label: '导出微博', icon: MessageCircle, desc: '获取用户发布的微博' },
  {
    key: 'exportAllWeibo',
    label: '导出全部微博',
    icon: BarChart3,
    desc: '包括所有历史微博',
  },
  { key: 'includeReposts', label: '包含转发微博', icon: Repeat, desc: '同时获取转发的内容' },
  {
    key: 'includeRepostImages',
    label: '包含转发的图片',
    icon: ImageIcon,
    desc: '下载转发微博中的图片',
  },
  { key: 'includeComments', label: '包含评论', icon: MessageCircle, desc: '获取微博的评论数据' },
  { key: 'exportFavorites', label: '导出收藏', icon: Bookmark, desc: '获取用户收藏的微博' },
  {
    key: 'exportFollowingList',
    label: '导出关注列表',
    icon: Heart,
    desc: '获取关注的用户列表',
  },
  {
    key: 'continueFromLast',
    label: '继续上次的记录',
    icon: Clock,
    desc: '从上次停止的地方继续',
  },
]

// 更新配置的方法
const updateConfig = (key, value) => {
  config.value[key] = value
}

// 如果 selectedUser 是 prop，需要在这里定义
// import { defineProps } from 'vue';
// const props = defineProps({
//   selectedUser: {
//     type: Object,
//     default: null
//   }
// });
</script>

<template>
  <div
    class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8"
  >
    <!-- 开关选项 -->
    <Card class="p-0 gap-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader class="py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardTitle class="flex items-center gap-3">
          <div class="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
            <Download class="h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-xl">
              获取选项
            </div>
            <div class="text-sm font-normal text-gray-600 dark:text-gray-400">
              选择要获取的数据类型
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-2 py-4">
        <Label
          v-for="item in switchOptions"
          :key="item.key"
          :for="item.key"
          class="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <div class="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <component :is="item.icon" class="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div class="font-medium  text-sm text-gray-900 dark:text-white">
              {{ item.label }}
            </div>
          </div>
          <Switch
            :id="item.key"
            :checked="config[item.key]"
            @update:checked="(checked) => updateConfig(item.key, checked)"
          />
        </Label>
      </CardContent>
    </Card>

    <!-- 选择器选项 -->
    <Card class="p-0 gap-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader class="py-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardTitle class="flex items-center gap-3">
          <div class="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
            <Star class="h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-xl">
              详细设置
            </div>
            <div class="text-sm font-normal text-gray-600 dark:text-gray-400">
              配置获取的具体参数
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-4 py-4">
        <div class="space-y-3">
          <Label class="flex items-center gap-2 text-base font-medium">
            <MessageCircle class="h-5 w-5 text-purple-600" />
            评论获取数量
          </Label>
          <Select
            id="comment-count"
            v-model="config.commentCount"
            :disabled="!config.hasComment"
          >
            <SelectTrigger
              class="w-full"
            >
              <SelectValue placeholder="5 条" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="i in 4"
                  :key="i"
                  :value="i * 5"
                >
                  {{ i * 5 }} 条
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-4">
          <Label class="flex items-center gap-2 text-base font-medium">
            <Calendar class="h-5 w-5 text-purple-600" />
            时间范围设置
          </Label>
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
              <Label class="text-sm text-gray-600">开始日期</Label>
              <Input
                type="date"
                :model-value="config.startDate"
                class="h-12"
                @update:model-value="(value) => updateConfig('startDate', value)"
              />
            </div>
            <div class="space-y-2">
              <Label class="text-sm text-gray-600">结束日期</Label>
              <Input
                type="date"
                :model-value="config.endDate"
                class="h-12"
                @update:model-value="(value) => updateConfig('endDate', value)"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
