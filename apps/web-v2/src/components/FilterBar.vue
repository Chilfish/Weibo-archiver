<script setup lang="ts">
import { usePostStore } from '@workspace/core'
import { CalendarDays, Image } from 'lucide-vue-next'
import DateSelect from './common/DateSelect.vue'
import OpenSetting from './common/OpenSetting.vue'
import SearchBar from './common/SearchBar.vue'

const postStore = usePostStore()

async function onDateConfirm(start: number, end: number) {
  await postStore.getByTime(1, start, end)
}
</script>

<template>
  <div class="sticky top-0 z-10 rounded-2xl shadow-sm p-3 mb-6 glassmorphism">
    <div class="flex items-center gap-2 flex-wrap">
      <OpenSetting />

      <RouterLink
        to="/gallery"
        class="btn btn-ghost btn-sm rounded-full bg-purple-50 hover:bg-purple-100 text-purple-500"
      >
        <Image class="w-4 h-4" />
        <span>相册</span>
      </RouterLink>

      <div class="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost btn-sm gap-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <CalendarDays class="w-4 h-4 text-blue-500" />
          <span class="text-gray-700">日期</span>
        </label>

        <DateSelect
          tabindex="0"
          class="dropdown-content"
          @confirm="onDateConfirm"
        />
      </div>

      <SearchBar
        class="flex-1"
      />
    </div>
  </div>
</template>
