<script setup lang="ts">
import { ArrowRight, CalendarDays, Filter, Image, Search, Settings } from 'lucide-vue-next'
</script>

<template>
  <div class="sticky top-0 z-10 bg-base-100 rounded-2xl shadow-sm p-3 mb-6">
    <div class="flex items-center gap-2 flex-wrap">
      <div class="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost btn-sm gap-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Filter class="w-4 h-4" />
          <span class="text-gray-700">筛选</span>
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-white rounded-box w-36 mt-1">
          <li><a class="active:bg-blue-50">全部微博</a></li>
          <li><a class="active:bg-blue-50">含图片</a></li>
          <li><a class="active:bg-blue-50">含视频</a></li>
          <li><a class="active:bg-blue-50">含链接</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost btn-sm gap-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <CalendarDays class="w-4 h-4" />
          <span class="text-gray-700">日期</span>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-white rounded-box w-36 mt-1"
        >
          <li><a class="active:bg-blue-50">最新发布</a></li>
          <li><a class="active:bg-blue-50">最早发布</a></li>
        </ul>
      </div>

      <RouterLink
        to="/gallery"
        class="btn btn-ghost btn-sm rounded-full bg-purple-50 hover:bg-purple-100 text-purple-500"
      >
        <Image class="w-4 h-4" />
        <span>相册</span>
      </RouterLink>

      <RouterLink
        to="/settings"
        class="btn btn-ghost btn-sm rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500"
      >
        <Settings class="w-4 h-4" />
        <span>设置</span>
      </RouterLink>

      <div class="relative flex-grow">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="w-4 h-4" />
        </div>
        <input
          type="text" placeholder="搜索微博内容..."
          class="w-full pl-10 pr-16 py-2 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-blue-200"
        >
        <button
          class="absolute inset-y-0 right-2 rounded-full px-3 flex items-center text-blue-500 hover:text-blue-600"
        >
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
