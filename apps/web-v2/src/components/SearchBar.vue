<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { SearchQuery } from '@/composables'
import {
  CheckIcon,
  FileText,
  ImageIcon,
  Repeat,
  Search,
  Sliders,
  Sparkles,
  XIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useSearch } from '@/composables'
import { cn } from '@/lib/utils'
import DatePicker from './DatePicker.vue'

const emits = defineEmits<{
  search: [query: SearchQuery]
}>()

const searchOptionsList = [
  {
    id: 'text-only',
    label: '纯文本',
    modelKey: 'withText',
    icon: FileText,
    css: 'text-purple-500',
  },
  {
    id: 'original',
    label: '原创微博',
    modelKey: 'withOriginal',
    icon: Sparkles,
    css: 'text-yellow-500',
  },
  {
    id: 'reposted',
    label: '转发微博',
    modelKey: 'withRepost',
    icon: Repeat,
    css: 'text-green-500',
  },
  {
    id: 'with-images',
    label: '包含图片',
    modelKey: 'withImage',
    icon: ImageIcon,
    css: 'text-blue-500',
  },
] as const

const dateRangeShortcut = [
  { text: '一周内', diff: 7 },
  { text: '一个月内', diff: 30 },
  { text: '半年内', diff: 366 / 2 },
  { text: '一年内', diff: 366 },
] as const

const showMoreFilter = ref(false)

const {
  searchText,
  searchOptions,
  dateRangeShortcutDiff,
  resetDateRange,
  resetOptions,
  setDateRangeShortcut,
  toSearchQuery,
} = useSearch()

function onSearch() {
  const searchQuery = toSearchQuery()
  emits('search', searchQuery)
}
</script>

<template>
  <div
    class="px-6 w-full"
  >
    <form
      class="flex items-center gap-2"
      @submit.prevent="onSearch"
    >
      <div class="relative w-full items-center">
        <Input
          id="search"
          v-model="searchText"
          type="text"
          placeholder="搜索微博..."
          class="pl-8 bg-card rounded-xl h-12 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
        <span
          v-if="searchText"
          class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
          @click="searchText = ''"
        >
          <XIcon class="size-4 text-muted-foreground" />
        </span>
      </div>
      <Button
        type="submit"
        class="rounded-2xl"
        size="lg"
      >
        搜索
      </Button>

      <Button
        variant="ghost"
        class="p-1 text-primary hover:text-primary"
        @click="showMoreFilter = !showMoreFilter"
      >
        <Sliders />
      </Button>
    </form>

    <div
      v-show="showMoreFilter"
      class="pt-4 border-t space-y-4 px-4 "
    >
      <div class="space-y-4">
        <h3 class="text-4 font-medium text-gray-700">
          内容类型
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="option in searchOptionsList"
            :key="option.id"
            class="rounded-xl shadow-2xs border-1 p-3 flex items-center justify-between"
          >
            <Label
              :for="option.id"
              class="cursor-pointer"
            >
              <component
                :is="option.icon"
                :class="[option.css]"
                class="size-4"
              />
              {{ option.label }}
            </Label>
            <Switch
              :id="option.id"
              v-model="searchOptions[option.modelKey]"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-4 font-medium text-gray-700">
          时间范围
        </h3>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="space-y-2">
              <Label for="date-from" class="text-sm">
                开始日期
              </Label>

              <DatePicker
                v-model:value="searchOptions.dateFrom as DateValue"
              />
            </div>

            <div class="space-y-2">
              <Label for="date-to" class="text-sm">
                结束日期
              </Label>
              <DatePicker
                v-model:value="searchOptions.dateTo as DateValue"
              />
            </div>
          </div>

          <div class="flex flex-wrap gap-2 items-center">
            <Button
              v-for="option in dateRangeShortcut"
              :key="option.diff"
              variant="outline"
              size="sm"
              class="rounded-full"
              :class="cn(dateRangeShortcutDiff === option.diff && 'border-primary text-primary hover:text-primary')"
              @click="() => setDateRangeShortcut(option.diff)"
            >
              {{ option.text }}
              <CheckIcon v-if="dateRangeShortcutDiff === option.diff" class="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              @click="resetDateRange"
            >
              清除日期
            </Button>
          </div>
        </div>
      </div>

      <div
        class="w-full flex items-center justify-between"
      >
        <Button
          v-show="showMoreFilter"
          variant="outline"
          class="ml-auto"
          @click="resetOptions"
        >
          清除所有筛选
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
