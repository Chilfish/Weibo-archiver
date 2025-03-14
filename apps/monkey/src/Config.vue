<script setup lang="ts">
import { formatDate } from '@shared'

import { config } from './composables/useConfig'

const ymd = (date: Date | number) => formatDate(date, 'YYYY-MM-DD')

const now = new Date()
const tomorrow = ymd(new Date(now.getTime() + 24 * 60 * 60 * 1000))
</script>

<template>
  <div class="mt-4 flex flex-col gap-3">
    <div class="">
      <Label>
        请选择要存档的范围，默认为所有微博
      </Label>

      <div class="date-range-picker">
        <div class="date-input-group">
          <Label for="startAt" class="text-xs text-gray-500">开始日期</Label>
          <Input
            id="startAt"
            :value="ymd(config.startAt)"
            type="date"
            :max="tomorrow"
            class="date-input"
            @update:model-value="(v) => config.startAt = new Date(v).getTime()"
          />
        </div>

        <div class="divider">
          至
        </div>

        <div class="date-input-group">
          <Label for="endAt" class="text-xs text-gray-500">结束日期</Label>
          <Input
            id="endAt"
            :value="ymd(config.endAt)"
            type="date"
            :max="tomorrow"
            class="date-input"
            @update:model-value="(v) => config.endAt = new Date(v).getTime()"
          />
        </div>
      </div>
    </div>

    <div
      v-show="config.hasComment"
      class="flex items-center gap-4"
    >
      <Label
        class="min-w-fit"
      >要获取的评论数（最多20条）</Label>
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
.options button {
  padding: 0;
}
</style>
