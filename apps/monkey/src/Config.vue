<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import type { Ref } from 'vue'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { cn } from '@workspace/shared/lib/utils'
import { Button } from '@workspace/ui/shadcn/button'

import { CheckboxLabel } from '@workspace/ui/shadcn/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/shadcn/popover'
import { RangeCalendar } from '@workspace/ui/shadcn/range-calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/shadcn/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/shadcn/tooltip'

import { CalendarIcon } from 'lucide-vue-next'

import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useConfigStore } from './stores'

const { config } = storeToRefs(useConfigStore())

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})
const startDate = today(getLocalTimeZone())
const endDate = startDate.add({ days: 7 })

const dateRange = ref({
  start: startDate,
  end: endDate,
}) as Ref<DateRange>
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-black!">
      请选择要存档的范围，默认为所有微博
    </p>

    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="cn(
            'w-[280px] justify-start text-left font-normal',
            !dateRange && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          <template v-if="dateRange.start">
            <template v-if="dateRange.end">
              {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }} - {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else>
            Pick a date
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        to="#plugin-app"
        class="w-auto p-0"
      >
        <RangeCalendar v-model="dateRange" initial-focus :number-of-months="2" @update:start-value="(startDate) => dateRange.start = startDate" />
      </PopoverContent>
    </Popover>

    <div
      v-if="!config.followingsOnly"
      class="center flex-wrap justify-start gap-2"
    >
      <CheckboxLabel
        id="largePic"
        v-model="config.largePic"
        label="使用原图"
      />

      <Tooltip>
        <TooltipTrigger>
          <CheckboxLabel
            id="hasComment"
            v-model="config.hasComment"
            label="包含评论"
          />
        </TooltipTrigger>
        <TooltipContent>
          包含评论将会减慢速度
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <CheckboxLabel
            id="hasRepost"
            v-model="config.hasRepost"
            label="包含转发的微博"
          />
        </TooltipTrigger>
        <TooltipContent>
          包含转发的微博将会减慢速度
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <CheckboxLabel
            v-show="config.hasRepost"
            id="repostPic"
            v-model="config.repostPic"
            label="导出转发的图片"
          />
        </TooltipTrigger>
        <TooltipContent>
          包含转发的微博将会减慢速度
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <CheckboxLabel
            id="restore"
            v-model="config.restore"
            label="继续上次的记录"
          />
        </TooltipTrigger>
        <TooltipContent>
          默认开始前都会清空之前的状态
        </TooltipContent>
      </Tooltip>

      <CheckboxLabel
        v-if="!config.weiboOnly"
        id="followingsOnly"
        v-model="config.followingsOnly"
        label="只导出关注列表"
      />
      <CheckboxLabel
        v-if="!config.followingsOnly"
        id="weiboOnly"
        v-model="config.weiboOnly"
        label="只导出微博"
      />
    </div>

    <div
      v-show="config.hasComment"
      class="flex items-center gap-4"
    >
      <span>要获取的评论数（最多20条）</span>
      <Select
        v-model="config.commentCount"
        class="w-26"
      >
        <SelectTrigger>
          <SelectValue placeholder="选择评论数" />
        </SelectTrigger>
        <SelectContent
          to="#plugin-app"
        >
          <SelectItem v-for="n in [0, 1, 2, 3, 4]" :key="n * 5" :value="n * 5">
            {{ n * 5 ? `${n * 5}条` : '没有' }}评论
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<style scoped>
@import url('./reset.css');
</style>
