<script setup lang="ts">
import { Book, Github, Heart } from 'lucide-vue-next'
import LazyImage from '../common/LazyImage.vue'

const APP_VERSION = 'v0.5.3'
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center text-center gap-2 mb-8">
      <LazyImage src="/icon.webp" class="w-24 h-24" />
      <h3 class="text-2xl font-bold text-gray-800">
        Weibo Archiver
        <span class="badge badge-primary badge-sm ml-2">{{ APP_VERSION }}</span>
      </h3>
    </div>

    <p class="text-center text-gray-600">
      微博备份工具，为账号被完全夹没前未雨绸缪 😭
    </p>

    <div class="flex justify-center gap-3 mt-4">
      <a
        href="https://github.com/Chilfish/Weibo-archiver"
        target="_blank"
        class="btn btn-sm btn-outline gap-2"
      >
        <Github class="w-4 h-4" />GitHub
      </a>
      <a
        href="https://docs.qq.com/doc/DTWttbXlMUGxZZnZq"
        target="_blank"
        class="btn btn-sm btn-outline btn-info gap-2"
      >
        <Book class="w-4 h-4" />使用文档
      </a>
      <!-- <a href="#" class="btn btn-sm btn-outline btn-success gap-2">
        <Code class="w-4 h-4" />示例数据
      </a> -->
    </div>

    <div class="border-t border-gray-200 my-6 pt-6 text-center">
      <p class="text-gray-600 mb-4">
        如果觉得这个项目对你有帮助，可以考虑赞助我 😇<br>这将给我更多的动力来维护这个项目
      </p>
      <a
        href="https://chilfish.top/sponsors"
        target="_blank"
        class="sponsor-button inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg"
      >
        <Heart class="w-4 h-4" />赞助项目
      </a>
    </div>

    <div class="mt-6 text-xs text-center text-gray-400">
      <p>© 2023 Weibo Archiver · 开源项目 · MIT License</p>
    </div>
  </div>
</template>

<style scoped>
.sponsor-button {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
  color: white;
  transition: all 0.3s;
}

.sponsor-button:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  transform: translateY(-1px);
}
</style>
