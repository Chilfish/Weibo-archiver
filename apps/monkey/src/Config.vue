<script setup lang="ts">
import { CheckboxLabel } from '@workspace/ui/shadcn/checkbox'
import { Input } from '@workspace/ui/shadcn/input'
import Label from '@workspace/ui/shadcn/label/Label.vue'
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
import { config } from './composables/useConfig'

const now = new Date()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
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
            v-model="config.startAt"
            type="date"
            :max="tomorrow"
            class="date-input"
          />
        </div>

        <div class="divider">
          至
        </div>

        <div class="date-input-group">
          <Label for="endAt" class="text-xs text-gray-500">结束日期</Label>
          <Input
            id="endAt"
            v-model="config.endAt"
            type="date"
            :max="tomorrow"
            class="date-input"
          />
        </div>
      </div>
    </div>

    <div
      class="options flex flex-wrap items-center justify-start gap-3"
    >
      <CheckboxLabel
        id="largePic"
        v-model="config.largePic"
        label="使用原图"
      />

      <Tooltip>
        <TooltipTrigger
          as="div"
        >
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
        <TooltipTrigger
          as="div"
        >
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
        <TooltipTrigger
          as="div"
        >
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
        <TooltipTrigger
          as="div"
        >
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
@import url('./reset.css');

.options button {
  padding: 0;
}

.date-range-picker {
  @apply flex items-end gap-4 mt-2 max-w-fit bg-gray-50/50 p-3 rounded-lg;
}

.date-input-group {
  @apply flex flex-col gap-1;
}

.date-input {
  @apply px-3 py-1.5 rounded-md border-gray-200 bg-white focus:border-primary;
  color-scheme: light;
}

.divider {
  @apply flex items-end mb-1.5 text-gray-500 px-1;
}
</style>
