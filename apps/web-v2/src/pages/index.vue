<script setup lang="ts">
import { onImportData } from '@weibo-archiver/core'
import {
  ArrowRight,
  Github,
  Heart,
  Import,
  Server,
  View,
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToData = () => {
  router.push('/post')
}

// 特性列表
const features = [
  {
    title: '完整备份',
    desc: '备份所有微博内容，包括文字、图片和视频链接',
  },
  {
    title: '媒体保存',
    desc: '下载并存储微博中的图片，防止链接失效',
  },
  {
    title: '离线浏览',
    desc: '本地服务支持完全离线浏览，无需联网',
  },
  {
    title: '数据安全',
    desc: '所有数据存储在你的设备上，确保隐私安全',
  },
]

// 使用指南
const guides = [
  {
    title: '第一步：使用油猴脚本备份数据',
    desc: '安装插件后，访问微博个人主页，点击开始备份',
  },
  {
    title: '第二步：下载图片到本地（可选）',
    desc: '使用本地服务器工具下载微博中的图片，防止链接失效',
  },
  {
    title: '第三步：在线浏览数据',
    desc: '在本网站导入数据后，即可在线浏览所有微博内容',
  },
  {
    title: '第四步：离线浏览数据（可选）',
    desc: '使用本地服务器工具离线浏览所有微博内容',
  },
]

// 资源链接
const resources = [
  {
    title: '油猴脚本',
    desc: '安装后可备份微博数据',
    link: 'https://raw.githubusercontent.com/Chilfish/Weibo-archiver/monkey/weibo-archiver.user.js',
  },
  {
    title: '本地服务器',
    desc: '下载图片与离线浏览',
    link: 'https://github.com/Chilfish/Weibo-archiver/releases',
  },
  {
    title: '使用教程',
    desc: '详细的使用说明',
    link: 'https://docs.qq.com/doc/DTWttbXlMUGxZZnZq',
  },
  {
    title: 'GitHub仓库',
    desc: '项目源码与更新',
    link: 'https://github.com/Chilfish/Weibo-archiver',
  },
]
</script>

<template>
  <div class="min-h-screen from-gray-50 to-blue-50 bg-gradient-to-b dark:from-dark-900 dark:to-dark-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-16">
      <div class="absolute top-40 h-72 w-72 rounded-full bg-blue-400/5 blur-3xl -left-20" />
      <div class="absolute h-64 w-64 rounded-full bg-pink-400/5 blur-3xl -right-20 -top-20" />

      <div class="relative z-10 mx-auto px-4 container">
        <div class="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div class="md:w-1/2 space-y-6">
            <div class="flex items-center gap-2">
              <img
                class="w-24"
                alt="logo"
                src="/icon.webp"
              >
              <span class="ml-6 text-3xl font-bold">Weibo Archiver</span>
            </div>

            <h1 class="text-4xl text-gray-800 font-bold leading-tight md:text-5xl dark:text-white">
              将你的微博回忆 <span class="text-gradient from-blue-500 to-violet-600 bg-gradient-to-r">永久珍藏</span>
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-300">
              轻松备份你的微博内容和媒体，防止账号被夹后微博失效，安全离线浏览珍贵回忆。
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <button
                class="relative rounded-lg from-blue-500 to-violet-600 bg-gradient-to-r px-6 py-3 text-white font-medium"
              >
                <input
                  type="file"
                  accept=".json"
                  class="absolute inset-0 opacity-0 w-full h-full"
                  @change="(e) => onImportData(e).then(goToData)"
                >
                <Import class="mr-2 inline-block h-6 w-6" />
                开始导入数据
              </button>

              <button
                class="border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium transition-all dark:border-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-800"
                @click="goToData"
              >
                <View class="mr-2 inline-block h-6 w-6" />
                查看已有数据
              </button>
            </div>
          </div>
          <div class="md:w-1/2">
            <img
              class="rounded-xl"
              src="https://p.chilfish.top/weibo/cover.webp"
              alt="微博归档工具预览"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white/50 py-12 dark:bg-dark-800/30">
      <div class="mx-auto px-4 container">
        <h2 class="mb-12 text-center text-2xl text-gray-800 font-bold md:text-3xl dark:text-white">
          主要功能
        </h2>

        <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="border border-gray-100 rounded-xl bg-white p-6 dark:border-dark-600 dark:bg-dark-700"
          >
            <h3 class="mb-2 text-xl text-gray-800 font-bold dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="py-12">
      <div class="mx-auto px-4 container">
        <h2 class="mb-12 text-center text-2xl text-gray-800 font-bold md:text-3xl dark:text-white">
          使用资源
        </h2>

        <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <a
            v-for="resource in resources"
            :key="resource.title"
            :href="resource.link"
            target="_blank"
            class="border border-gray-100 rounded-xl bg-white p-6 transition-colors dark:border-dark-600 hover:border-blue-300 dark:bg-dark-700 dark:hover:border-blue-600"
          >
            <ArrowRight class="mb-4 h-6 w-6 text-blue-500" />
            <h3 class="mb-2 text-xl text-gray-800 font-bold dark:text-white">{{ resource.title }}</h3>

            <p class="text-gray-600 dark:text-gray-300">{{ resource.desc }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Guide Section -->
    <section class="bg-white/50 py-12 dark:bg-dark-800/30">
      <div class="mx-auto px-4 container">
        <h2 class="mb-12 text-center text-2xl text-gray-800 font-bold md:text-3xl dark:text-white">
          使用流程
        </h2>

        <div class="mx-auto max-w-3xl">
          <div
            v-for="(guide, index) in guides"
            :key="guide.title"
            class="mb-8 flex"
          >
            <div class="mr-6 flex-shrink-0">
              <div class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                {{ index + 1 }}
              </div>
            </div>
            <div>
              <h3 class="mb-2 text-xl text-gray-800 font-bold dark:text-white">
                {{ guide.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ guide.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Local Server Description -->
    <section class="py-12">
      <div class="mx-auto px-4 container">
        <div class="mx-auto max-w-3xl border border-gray-100 rounded-xl bg-white p-6 dark:border-dark-600 dark:bg-dark-700">
          <h2 class="mb-4 text-2xl text-gray-800 font-bold dark:text-white">
            <Server class="mr-2 inline-block h-6 w-6" />
            本地服务器说明
          </h2>

          <p class="mb-4 text-gray-600 dark:text-gray-300">
            微博备份工具提供了本地服务器程序，具有两个主要功能：
          </p>

          <ol class="list-decimal pl-5 text-gray-600 space-y-2 dark:text-gray-300">
            <li>下载微博中的图片，防止链接失效</li>
            <li>在本地运行服务器，用于离线浏览备份的微博数据和图片</li>
          </ol>

          <div class="mt-6">
            <h3 class="mb-2 text-lg text-gray-800 font-bold dark:text-white">
              基本命令
            </h3>

            <div class="rounded-lg bg-gray-100 p-4 dark:bg-dark-800">
              <p class="mb-2 text-gray-700 font-mono dark:text-gray-300">
                # 从 imgs.csv 下载图片到 images 目录
              </p>
              <p class="mb-4 text-gray-700 font-mono dark:text-gray-300">
                ./weibo-archiver.exe --dl -i imgs.csv -o images
              </p>

              <p class="mb-2 text-gray-700 font-mono dark:text-gray-300">
                # 启动本地服务器
              </p>
              <p class="text-gray-700 font-mono dark:text-gray-300">
                ./weibo-archiver.exe --server -o images
              </p>
            </div>
          </div>

          <div class="mt-4 text-center">
            <a
              href="https://github.com/Chilfish/Weibo-archiver/blob/main/server/README.md"
              target="_blank"
              class="text-blue-500 font-medium hover:text-blue-700"
            >
              查看完整服务器说明 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>Weibo Archiver © 2023-{{ new Date().getFullYear() }} - 所有数据均保存在本地，确保您的隐私安全</p>
      <div class="mt-2 flex justify-center gap-4">
        <a
          href="https://github.com/Chilfish/Weibo-archiver"
          target="_blank"
          class="hover:text-gray-700 dark:hover:text-gray-300"
        >
          <Github class="h-6 w-6" />
        </a>
        <a
          href="https://chilfish.top/sponsors"
          target="_blank"
          class="hover:text-gray-700 dark:hover:text-gray-300"
        >
          <Heart class="h-6 w-6" />
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.container {
  max-width: 1200px;
}
</style>
