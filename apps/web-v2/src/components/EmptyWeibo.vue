<script setup lang="ts">
import { parseAndImport, readFile } from '@weibo-archiver/core'
import { ExternalLink, Eye, Import } from 'lucide-vue-next'

async function onImportData(e: Event) {
  const data = await readFile(e)
  await parseAndImport(data)
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center pt-8 px-4"
  >
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-3">
      欢迎使用 Weibo Archiver
    </h1>
    <p class="text-lg text-gray-600 text-center max-w-xl mb-8">
      开始备份您的微博记忆，防止珍贵内容丢失
    </p>

    <div
      class="flex gap-4 justify-center"
    >
      <button
        class="btn btn-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg rounded-full px-10 mb-12 relative"
      >
        <input
          type="file"
          accept=".json"
          class="absolute inset-0 opacity-0 w-full h-full"
          @change="onImportData"
        >
        <Import class="mr-2 w-6 h-6" />
        导入数据
      </button>

      <RouterLink
        class="btn btn-lg btn-outline rounded-full btn-secondary"
        to="/example"
      >
        <Eye class="mr-2 w-6 h-6" />
        查看示例数据
      </RouterLink>
    </div>

    <!-- 引导步骤 -->
    <div class="rounded-2xl p-6 max-w-2xl w-full">
      <h2 class="text-xl font-bold text-gray-800 mb-6">
        开始使用的几个简单步骤
      </h2>

      <ul class="steps steps-vertical gap-4">
        <li class="step step-primary">
          <div class="text-start ">
            <h3 class="font-bold text-lg text-gray-800">
              安装油猴脚本
            </h3>
            <p class="text-gray-600 mt-1">
              从
              <a
                href="#"
                class="inline-flex items-center text-primary hover:text-primary/80"
              >
                GitHub 仓库
                <ExternalLink class="w-4 h-4" />
              </a>
              安装 Weibo Archiver 油猴脚本
            </p>
          </div>
        </li>

        <li class="step step-primary">
          <div class="text-start">
            <h3 class="font-bold text-lg text-gray-800">
              导出微博数据
            </h3>
            <p class="text-gray-600 mt-1">
              登录微博后，通过脚本导出您的微博数据（文字、图片、时间等）
            </p>
          </div>
        </li>
        <li class="step step-primary">
          <div class="text-start">
            <h3 class="font-bold text-lg text-gray-800">
              导入到 Weibo Archiver
            </h3>
            <p class="text-gray-600 mt-1">
              点击上方的"导入数据"按钮，将导出的数据文件保存到网页端本地
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
