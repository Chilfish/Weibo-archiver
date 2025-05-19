<script setup lang="ts">
import { Eye, Import } from 'lucide-vue-next'
import ImportData from '@/components/common/ImportData.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center pt-28 px-4"
  >
    <h1 class="text-3xl font-bold  text-center mb-3">
      欢迎使用 Weibo Archiver
    </h1>
    <p class="text-lg  text-center max-w-xl mb-8">
      开始备份您的微博记忆，防止珍贵内容丢失
    </p>

    <div
      class="flex gap-4 justify-center"
    >
      <Button
        class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg rounded-full px-10 mb-12 relative"
      >
        <ImportData />
        <Import />
        导入数据
      </Button>

      <Button
        as-child
        variant="outline"
      >
        <RouterLink
          class="rounded-full btn-secondary"
          to="/example"
        >
          <Eye />
          查看示例数据
        </RouterLink>
      </Button>
    </div>
  </div>
</template>
