<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'
</script>

<template>
  <Card class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
    <CardContent class="">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <InfoIcon class="h-6 w-6 text-white" />
        </div>
        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-blue-900 dark:text-blue-100">
            💡 使用小贴士
          </h3>
          <div class="flex flex-col gap-3 text-blue-700 dark:text-blue-300">
            <div class="flex items-start gap-2">
              <span class="text-lg">🔄</span>
              <span>获取的数据将自动保存到本地浏览器存储中</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-lg">⏰</span>
              <span>大量数据获取可能需要较长时间，请保持页面开启</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-lg">📊</span>
              <span>获取完成后可在首页查看和管理数据</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
