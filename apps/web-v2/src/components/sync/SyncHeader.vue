<script setup lang="ts">
import { DatabaseIcon, SparklesIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="text-center space-y-6">
    <div class="relative inline-flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 animate-pulse" />
      <div class="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
        <DatabaseIcon class="h-10 w-10 text-white" />
        <SparklesIcon class="absolute -top-1 -right-1 h-6 w-6 text-yellow-400 animate-bounce" />
      </div>
    </div>
    <div class="space-y-3">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
        爬取您的全部微博
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
        🚀 完整备份微博用户的所有珍贵数据
        <br>
        <span class="">包括微博内容、图片、评论、关注列表等信息，一键搞定！</span>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
