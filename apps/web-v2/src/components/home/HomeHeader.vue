<script setup lang="ts">
import type { SortOption } from '@weibo-archiver/core'
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ClockIcon,
  MessageCircleIcon,
  RepeatIcon,
  TrendingUpIcon,
} from 'lucide-vue-next'
import { reactive } from 'vue'

defineProps<{
  totalPosts: number
}>()

const emits = defineEmits<{
  sortChange: [sort: SortOption]
  manualSync: []
}>()

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
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
            我的微博
          </h1>
          <Badge variant="outline" class="bg-primary/10 text-primary border-primary/20">
            {{ totalPosts }} 条微博
          </Badge>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
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
      </div>
    </CardContent>
  </Card>
</template>
