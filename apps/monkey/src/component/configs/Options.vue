<script setup lang="ts">
import type { UserConfig } from '@/types'
import { config } from '@/composables/useConfig'
import DateRange from '../DateRange.vue'

interface Option {
  label: string
  value: keyof UserConfig
  remark?: string
  disabled?: (config: UserConfig) => boolean
}

const options: Option[] = [
  {
    label: '导出全部微博',
    value: 'isFetchAll',
    remark: '导出全部微博，不限制时间范围',
  },
  {
    label: '包含转发的微博',
    value: 'hasRepost',
    remark: '导出微博时包含转发微博',
  },
  {
    label: '包含转发的图片',
    value: 'repostPic',
    remark: '包含转发微博中的图片',
  },
  {
    label: '包含评论',
    value: 'hasComment',
    remark: '导出微博时包含部分一级评论',
  },
  {
    label: '继续上次的记录',
    value: 'restore',
    remark: '从上次终止的地方继续，不清除本地缓存',
  },
  {
    label: '导出收藏',
    value: 'hasFavorites',
    remark: '导出自己收藏的微博，对其他人无效',
  },
  {
    label: '导出微博',
    value: 'hasWeibo',
    remark: '',
  },
  {
    label: '导出关注列表',
    value: 'hasFollowings',
    remark: '',
  },
] as const
</script>

<template>
  <label
    class="block mb-2"
  >
    爬取设置
  </label>
  <div
    tabindex="0"
    class="bg-base-100 px-4 py-2 rounded-xl border-base-300 text-base-content! m-0!"
  >
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center py-2"
    >
      <label :for="option.value">
        <span>
          {{ option.label }}
        </span>
        <span
          v-if="option.remark"
          class="block text-[0.8rem] text-gray-500"
        >
          {{ option.remark }}
        </span>
      </label>

      <input
        :id="option.value"
        v-model="config[option.value]"
        type="checkbox"
        class="toggle toggle-primary ml-auto"
        :disabled="option.disabled?.(config)"
      >
    </div>

    <label
      for="commentCount"
      class="label my-2 font-semibold"
    >
      评论获取数量
    </label>

    <select
      id="commentCount"
      v-model="config.commentCount"
      class="select w-full px-4"
      :disabled="!config.hasComment"
    >
      <option
        disabled
        selected
      >
        请选择
      </option>
      <option
        v-for="i in 4"
        :key="i"
        :value="i * 5"
      >
        {{ i * 5 }} 条
      </option>
    </select>

    <label
      for="timeRange"
      class="label my-2 font-semibold"
    >
      导出的时间范围
    </label>

    <DateRange
      :disabled="config.isFetchAll"
      :start="config.startAt"
      :end="config.endAt"
      @change="(start, end) => {
        config.startAt = start
        config.endAt = end
      }"
      @error="console.log"
    />
  </div>
</template>
