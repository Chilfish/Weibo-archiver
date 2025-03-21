<script setup lang="ts">
import { Download, Trash2, Upload } from 'lucide-vue-next'
import { config } from '../../composables'
import ImageSourceOption from './ImageSourceOption.vue'

const imageSourceOptions = [
  {
    id: 'local',
    value: 'local',
    label: '使用本地图片链接',
    description: '需预先下载图片到本地存储（http://localhost:3000/images/）',
  },
  {
    id: 'cdn',
    value: 'cdn',
    label: '使用默认的CDN',
    description: 'https://cdn.ipfsscan.io/weibo',
  },
  {
    id: 'original',
    value: 'original',
    label: '使用微博原图',
    description: '需配合Header Editor插件',
  },
  {
    id: 'custom',
    value: 'custom',
    label: '使用自建图床链接',
    description: '指向图片所在的目录',
    showCustomInput: true,
  },
]

// https://daisyui.com/docs/themes/
const THEMES = [
  'light',
  'system',
  'cupcake',
  'dark',
  'emerald',
  'valentine',
  'lofi',
  'dracula',
  'cmyk',
  'business',
  'winter',
] as const
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="label">
        图片链接设置
      </h3>
      <div class="space-y-2">
        <ImageSourceOption
          v-for="option in imageSourceOptions"
          :id="option.id"
          :key="option.id"
          v-model="config.imgHost"
          v-model:custom-url="config.customImageUrl"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :show-custom-input="option.showCustomInput"
        />
      </div>
    </div>

    <div
      class="flex flex-col gap-2"
    >
      <h3
        class="label"
      >
        主题
      </h3>
      <select
        v-model="config.theme"
        class="select select-bordered w-fit"
      >
        <option
          v-for="theme in THEMES"
          :key="theme"
          :value="theme"
        >
          {{ theme }}
        </option>
      </select>
    </div>

    <div>
      <h3 class="label">
        数据管理
      </h3>
      <div class="flex flex-wrap gap-3">
        <button class="btn btn-sm btn-primary">
          <Upload class="w-4 h-4 mr-2" />导入数据
        </button>
        <button class="btn btn-sm btn-outline">
          <Download class="w-4 h-4 mr-2" />导出数据
        </button>
        <button class="btn btn-sm btn-outline btn-error">
          <Trash2 class="w-4 h-4 mr-2" />重置所有数据
        </button>
      </div>
    </div>
  </div>
</template>

<style>
h3.label {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

}
</style>
