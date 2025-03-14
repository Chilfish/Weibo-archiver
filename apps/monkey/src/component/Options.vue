<script setup lang="ts">
import type { UserConfig } from '../types'
import { RotateCw } from 'lucide-vue-next'
import { config, useConfig } from '../composables/useConfig'

interface Option {
  label: string
  value: keyof UserConfig
  remark?: string
}

const options: Option[] = [
  {
    label: '使用原图',
    value: 'largePic',
    remark: '导出微博图片列表时使用原图',
  },
  {
    label: '包含转发的微博',
    value: 'hasRepost',
    remark: '导出微博时包含转发微博',
  },
  {
    label: '导出转发的图片',
    value: 'repostPic',
    remark: '包含转发微博中的图片',
  },
  {
    label: '包含评论',
    value: 'hasComment',
    remark: '导出微博时包含部分一级评论',
  },
  {
    label: '导出关注列表',
    value: 'followingsOnly',
    remark: '只导出关注列表，不爬取微博',
  },
  {
    label: '只导出微博',
    value: 'weiboOnly',
    remark: '只导出微博，不导出关注列表',
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex">
      <label class="label">
        导出选项
      </label>

      <button
        class="btn-ghost btn-sm text-base-content ml-auto text-sm btn"
        @click="useConfig().resetConfig"
      >
        <div class="flex items-center gap-1">
          <RotateCw class="h-4 w-4" />
          重置
        </div>
      </button>
    </div>

    <div class="bg-base-100 card px-4 py-2">
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
            class="block text-sm text-gray-500"
          >
            {{ option.remark }}
          </span>
        </label>

        <input
          :id="option.value"
          v-model="config[option.value]"
          type="checkbox"
          class="toggle toggle-primary ml-auto"
        >
      </div>
    </div>

    <label
      for="commentCount"
      class="label"
    >
      评论获取数量
    </label>

    <select
      id="commentCount"
      v-model="config.commentCount"
      class="select w-full px-4"
      :disabled="!config.hasComment"
    >
      <option disabled selected>
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
  </div>
</template>
