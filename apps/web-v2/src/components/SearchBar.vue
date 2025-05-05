<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { cn } from '@/lib/utils'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChevronDown, ChevronUp, Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import DatePicker from './DatePicker.vue'

interface SearchOpts {
  withText: boolean
  withImage: boolean
  withOriginal: boolean
  withRepost: boolean
  dateFrom: DateValue | undefined
  dateTo: DateValue | undefined
}

const searchOptionsList = [
  { id: 'text-only', label: '纯文本', modelKey: 'withText' },
  { id: 'original', label: '原创微博', modelKey: 'withOriginal' },
  { id: 'reposted', label: '转发微博', modelKey: 'withRepost' },
  { id: 'with-images', label: '包含图片', modelKey: 'withImage' },
] as const

const dateRangeShortcut = [
  { text: '一周内', diff: 7 },
  { text: '一个月内', diff: 30 },
  { text: '半年内', diff: 366 / 2 },
  { text: '一年内', diff: 365 },
] as const

const now = today(getLocalTimeZone())

const defaultSearchOpts: SearchOpts = {
  withText: true,
  withImage: true,
  withOriginal: true,
  withRepost: true,
  dateFrom: undefined,
  dateTo: undefined,
}

const searchOptions = ref<SearchOpts>({ ...defaultSearchOpts })
const showMoreFilter = ref(false)
const dateRangeShortcutDiff = ref(0)

function resetOptions() {
  searchOptions.value = { ...defaultSearchOpts }
  resetDateRange()
}

function setDateRangeShortcut(diff: number) {
  dateRangeShortcutDiff.value = diff
  searchOptions.value.dateTo = now
  searchOptions.value.dateFrom = now.subtract({ days: diff })
}

function resetDateRange() {
  dateRangeShortcutDiff.value = 0
  searchOptions.value.dateFrom = undefined
  searchOptions.value.dateTo = undefined
}

watch([
  () => searchOptions.value.dateFrom,
  () => searchOptions.value.dateTo,
], ([from, to]) => {
  if (!from || !to) {
    return
  }

  const toDate = to.toDate('Asia/Shanghai').getTime()
  const fromDate = from.toDate('Asia/Shanghai').getTime()
  const diff = (toDate - fromDate) / 1000 / 60 / 60 / 24

  if (diff !== dateRangeShortcutDiff.value) {
    dateRangeShortcutDiff.value = 0
  }
})
</script>

<template>
  <Card
    class=""
  >
    <CardContent>
      <div
        class="flex items-center gap-2"
      >
        <div class="relative w-full md:w-[36rem] items-center">
          <Input
            id="search"
            type="text"
            placeholder="搜索微博..."
            class="pl-10 rounded-xlh-10 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <Button>
          搜索
        </Button>
      </div>

      <div
        class="flex justify-between items-center pt-4"
      >
        <Button
          variant="ghost"
          class="p-2 text-primary hover:text-primary"
          @click="showMoreFilter = !showMoreFilter"
        >
          高级搜索
          <ChevronUp v-if="!showMoreFilter" />
          <ChevronDown v-else />
        </Button>
        <Button
          v-show="showMoreFilter"
          variant="ghost"
          @click="resetOptions"
        >
          清除所有筛选
        </Button>
      </div>

      <div
        v-show="showMoreFilter"
        class="pt-4 border-t border-gray-100 space-y-6 animate-in fade-in-50 duration-200"
      >
        <div class="space-y-4">
          <h3 class="text-sm font-medium text-gray-700">
            内容类型
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="option in searchOptionsList"
              :key="option.id"
              class="bg-gray-50 rounded-xl p-3 flex items-center justify-between"
            >
              <Label
                :for="option.id"
                class="cursor-pointer"
              >
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
          <h3 class="text-sm font-medium text-gray-700">
            时间范围
          </h3>
          <div class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="date-from" class="text-sm">
                  开始日期
                </Label>

                <DatePicker v-model:value="searchOptions.dateFrom as DateValue" />
              </div>

              <div class="space-y-2">
                <Label for="date-to" class="text-sm">
                  结束日期
                </Label>
                <DatePicker v-model:value="searchOptions.dateTo as DateValue" />
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
      </div>

      <pre>{{ searchOptions }}</pre>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
