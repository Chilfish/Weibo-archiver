<script setup lang="ts">
import type { SortOption } from '@weibo-archiver/core'
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  ClockIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  RepeatIcon,
  TrendingUpIcon,
} from 'lucide-vue-next'
import { reactive } from 'vue'

defineProps<{
  isLoading: boolean
  lastSyncTime: Date
  totalPosts: number
}>()

const emits = defineEmits<{
  sortChange: [sort: SortOption]
  manualSync: []
}>()

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1)
    return '刚刚'
  if (minutes < 60)
    return `${minutes}分钟前`
  if (minutes < 1440)
    return `${Math.floor(minutes / 60)}小时前`
  return date.toLocaleDateString('zh-CN')
}

const sortBy = reactive<SortOption>({
  field: 'time',
  order: 'desc',
})

const getSortIcon = (field: string) => {
  if (sortBy.field !== field)
    return ArrowUpDownIcon
  return sortBy.order === 'desc' ? ArrowDownIcon : ArrowUpIcon
}

const handleSortChange = (field: SortOption['field']) => {
  if (sortBy.field === field) {
    sortBy.order = sortBy.order === 'desc' ? 'asc' : 'desc'
  }
  else {
    // 新字段，默认降序
    sortBy.order = 'desc'
  }
  sortBy.field = field
  emits('sortChange', sortBy)
}
</script>

<template>
  <Card class="sm:w-[70vw]">
    <CardContent>
      <div class="space-y-6">
        <!-- 标题和基本信息 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
              我的微博
            </h1>
            <Badge variant="outline" class="bg-primary/10 text-primary border-primary/20">
              {{ totalPosts }} 条微博
            </Badge>
          </div>
          <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon class="h-4 w-4" />
            <span>最后更新: {{ formatTime(lastSyncTime) }}</span>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">排序:</span>

          <Button
            :variant="sortBy.field === 'time' ? 'default' : 'outline'"
            size="sm"
            @click="handleSortChange('time')"
          >
            <ClockIcon class="mr-1 h-4 w-4" />
            时间
            <component :is="getSortIcon('time')" />
          </Button>

          <Button
            :variant="sortBy.field === 'likes' ? 'default' : 'outline'"
            size="sm"
            @click="handleSortChange('likes')"
          >
            <TrendingUpIcon class="mr-1 h-4 w-4" />
            点赞
            <component :is="getSortIcon('likes')" />
          </Button>

          <Button
            :variant="sortBy.field === 'comments' ? 'default' : 'outline'"
            size="sm"
            @click="handleSortChange('comments')"
          >
            <MessageCircleIcon class="mr-1 h-4 w-4" />
            评论
            <component :is="getSortIcon('comments')" />
          </Button>

          <Button
            :variant="sortBy.field === 'reposts' ? 'default' : 'outline'"
            size="sm"
            @click="handleSortChange('reposts')"
          >
            <RepeatIcon class="mr-1 h-4 w-4" />
            转发
            <component :is="getSortIcon('reposts')" />
          </Button>

          <Button
            :disabled="isLoading"
            class="ml-auto"
            variant="outline"
            @click="emits('manualSync')"
          >
            <RefreshCwIcon class="mr-2 h-4 w-4" :class="[{ 'animate-spin': isLoading }]" />
            {{ isLoading ? "同步中" : "手动同步" }}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
