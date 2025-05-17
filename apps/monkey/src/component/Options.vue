<script setup lang="ts">
import type { UserConfig } from '../types'
import { config } from '../composables/useConfig'
import DateRange from './DateRange.vue'

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
  // {
  //   label: '使用原图',
  //   value: 'largePic',
  //   remark: '导出微博图片列表时使用原图',
  // },
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
    label: '只导出关注列表',
    value: 'followingsOnly',
    remark: '只导出关注列表，不爬取微博',
    disabled: config => config.weiboOnly,
  },
  {
    label: '只导出微博',
    value: 'weiboOnly',
    remark: '只导出微博，不导出关注列表',
    disabled: config => config.followingsOnly,
  },
  {
    label: '只导出收藏',
    value: 'favoritesOnly',
    remark: '只导出收藏夹的微博',
    disabled: config => config.followingsOnly || config.weiboOnly,
  },
  // {
  //   label: '继续上次的记录',
  //   value: 'restore',
  //   remark: '从上次终止的地方继续',
  // },
] as const
</script>

<template>
  <div
    tabindex="0"
    class="collapse collapse-arrow bg-base-100 border-base-300 text-base-content! border m-0!"
  >
    <input type="checkbox" checked>

    <div class="collapse-title flex py-3 pr-8 font-semibold">
      <label class="label">
        导出选项
      </label>
    </div>

    <div class="collapse-content">
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
  </div>
</template>
