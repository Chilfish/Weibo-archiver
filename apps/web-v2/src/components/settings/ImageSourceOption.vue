<script setup lang="ts">
defineProps<{
  id: string
  value: string
  label: string
  description: string
  modelValue: string
  showCustomInput?: boolean
  customUrl?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'update:customUrl': [value: string]
}>()
</script>

<template>
  <div
    class="p-3 rounded-lg border cursor-pointer hover:bg-base-200 transition-colors"
    :class="{
      'border-primary bg-primary/5': modelValue === value,
      'border-base-300': modelValue !== value,
    }"
    @click="$emit('update:modelValue', value)"
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
              :checked="modelValue === value"
            >
          </label>
        </div>
      </div>
      <div>
        <div class="font-medium text-gray-800">
          {{ label }}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          {{ description }}
        </div>
      </div>
    </div>
    <div v-if="showCustomInput && modelValue === value" class="mt-3 pl-8">
      <input
        :value="customUrl"
        type="text"
        placeholder="请输入图床链接"
        class="input input-bordered w-full"
        @input="$emit('update:customUrl', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>
