<script setup lang="ts">
import { ref } from 'vue'
import DateRange from './DateRange.vue'

const emit = defineEmits<{
  (e: 'confirm', start: number, end: number): void
}>()
const start = ref(0)
const end = ref(0)

function confirmDate() {
  emit('confirm', start.value, end.value)
}
</script>

<template>
  <div
    class=" p-4 shadow-lg bg-base-100 rounded-xl w-96 mt-2 border border-gray-100"
  >
    <h3 class="text-sm font-medium text-gray-500 mb-3">
      选择日期范围
    </h3>

    <DateRange
      :start="start"
      :end="end"
      class="mb-4"
    />

    <div class="grid grid-cols-4 gap-2 mb-4">
      <button
        class="px-3 py-2 text-sm rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        @click="() => {
          start = Date.now() - 7 * 24 * 60 * 60 * 1000
          end = Date.now()
        }"
      >
        近一周
      </button>

      <button
        class="px-3 py-2 text-sm rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        @click="() => {
          start = Date.now() - 30 * 24 * 60 * 60 * 1000
          end = Date.now()
        }"
      >
        近一月
      </button>

      <button
        class="px-3 py-2 text-sm rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        @click="() => {
          start = Date.now() - 365 * 24 * 60 * 60 * 1000
          end = Date.now()
        }"
      >
        近一年
      </button>

      <button
        class="px-3 py-2 text-sm rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        @click="() => {
          start = Date.now()
          end = Date.now()
        }"
      >
        今天
      </button>
    </div>

    <div class="flex justify-end">
      <button
        class="px-4 py-2 text-sm font-medium rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 shadow-sm"
        @click="confirmDate"
      >
        应用筛选
      </button>
    </div>
  </div>
</template>
