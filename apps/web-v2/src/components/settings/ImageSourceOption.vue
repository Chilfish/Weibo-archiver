<script setup lang="ts">
import type { AppConfig } from '@/types'
import { Input } from '@/components/ui/input'

defineProps<{
  id: string
  value: AppConfig['imgHost']
  label: string
  description: string
  showCustomInput?: boolean
}>()

const imgHost = defineModel<AppConfig['imgHost']>('imgHost')
const customUrl = defineModel<string>('customUrl')
</script>

<template>
  <div
    class="p-3 rounded-lg border cursor-pointer hover:bg-base-200 transition-colors"
    :class="{
      'border-primary bg-primary/5': imgHost === value,
      'border-gray': imgHost !== value,
    }"
    @click="() => imgHost = value"
  >
    <div class="flex items-center">
      <div class="mr-3">
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              :id="id"
              type="radio"
              name="image-source"
              class="radio radio-primary radio-sm"
              :checked="imgHost === value"
            >
          </label>
        </div>
      </div>
      <div>
        <div class="font-medium ">
          {{ label }}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          {{ description }}
        </div>
      </div>
    </div>
    <div v-if="showCustomInput && imgHost === value" class="mt-3 pl-8">
      <Input
        v-model="customUrl"
        type="text"
        placeholder="请输入图床链接"
      />
    </div>
  </div>
</template>
