<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Book, Github, Heart } from 'lucide-vue-next'
import LazyImage from '../common/LazyImage.vue'

const APP_VERSION = 'v0.5.3'
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center justify-center text-center gap-2 mb-8">
      <LazyImage src="/icon.webp" class="w-24 h-24" />
      <h3 class="text-2xl font-bold ">
        Weibo Archiver
        <Badge class=" ml-2">
          {{ APP_VERSION }}
        </Badge>
      </h3>
    </div>

    <p class="text-center 0">
      微博备份工具，为账号被完全夹没前未雨绸缪 😭
    </p>

    <div class="flex justify-center gap-3 mt-4">
      <Button
        as="a"
        href="https://github.com/Chilfish/Weibo-archiver"
        target="_blank"
        variant="outline"
      >
        <Github class="w-4 h-4" />GitHub
      </Button>
      <Button
        as="a"
        href="https://docs.qq.com/doc/DTWttbXlMUGxZZnZq"
        target="_blank"
        variant="outline"
      >
        <Book class="w-4 h-4" />使用文档
      </Button>
      <!-- <a href="#" class="btn btn-sm btn-outline btn-success gap-2">
        <Code class="w-4 h-4" />示例数据
      </a> -->
    </div>

    <div class="border-t border-gray-200 my-6 pt-6 text-center">
      <p class="mb-4">
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

    <div class="mt-6 text-xs text-center ">
      <p>© {{ new Date().getFullYear() }} Weibo Archiver</p>
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
