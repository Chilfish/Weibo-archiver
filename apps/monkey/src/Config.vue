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
import { useConfigStore } from './stores'

const configStore = useConfigStore()

const now = new Date()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
</script>

<template>
  <div class="mt-4 flex flex-col gap-3">
    <div class="">
      <Label>
        请选择要存档的范围，默认为所有微博
      </Label>

      <div class="max-w-fit flex items-center justify-between gap-3">
        <Input
          id="startAt"
          v-model="configStore.config.startAt"
          type="date"
          :max="tomorrow"
        />
        <span>  至   </span>

        <Input
          id="endAt"
          v-model="configStore.config.endAt"
          type="date"
          :max="tomorrow"
        />
      </div>
    </div>

    <div
      class="options flex flex-wrap items-center justify-start gap-3"
    >
      <CheckboxLabel
        id="largePic"
        v-model="configStore.config.largePic"
        label="使用原图"
      />

      <Tooltip>
        <TooltipTrigger>
          <CheckboxLabel
            id="hasComment"
            v-model="configStore.config.hasComment"
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
            v-model="configStore.config.hasRepost"
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
            v-show="configStore.config.hasRepost"
            id="repostPic"
            v-model="configStore.config.repostPic"
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
            v-model="configStore.config.restore"
            label="继续上次的记录"
          />
        </TooltipTrigger>
        <TooltipContent>
          默认开始前都会清空之前的状态
        </TooltipContent>
      </Tooltip>

      <CheckboxLabel
        v-if="!configStore.config.weiboOnly"
        id="followingsOnly"
        v-model="configStore.config.followingsOnly"
        label="只导出关注列表"
      />
      <CheckboxLabel
        v-if="!configStore.config.followingsOnly"
        id="weiboOnly"
        v-model="configStore.config.weiboOnly"
        label="只导出微博"
      />
    </div>

    <div
      v-show="configStore.config.hasComment"
      class="flex items-center gap-4"
    >
      <Label
        class="min-w-fit"
      >要获取的评论数（最多20条）</Label>
      <Select
        v-model="configStore.config.commentCount"
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
</style>
