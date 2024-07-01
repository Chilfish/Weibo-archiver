<script setup lang="ts">
withDefaults(defineProps<{
  showDonate: boolean
}>(), {
  showDonate: true,
})

const version = import.meta.env.VITE_APP_VERSION
</script>

<template>
  <main class="h-full center-col gap-4">
    <n-image
      :width="82"
      :height="82"
      class="w-24"
      preview-disabled
      alt="logo"
      src="/icon.webp"
    />

    <div class="mb-4 center flex-wrap gap-2">
      <a
        href="https://github.com/Chilfish/Weibo-archiver"
        target="_blank"
        title="GitHub Repo"
      >
        <img
          alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/chilfish/weibo-archiver"
        >
      </a>

      <a
        href="https://github.com/Chilfish/Weibo-archiver/releases"
        target="_blank"
        title="下载页面"
      >
        <img
          alt="GitHub Downloads"
          src="https://img.shields.io/github/downloads/chilfish/weibo-archiver/total"
        >
      </a>
    </div>

    <h2 class="text-6 font-bold">
      Weibo Archiver v{{ version }}
    </h2>

    <p class="text-5">
      一个简单的微博备份工具，为账号被完全夹没前未雨绸缪😭
    </p>
    <p>
      第一次使用？点击查看
      <a
        href="https://docs.qq.com/doc/DTWttbXlMUGxZZnZq"
        target="_blank"
        title="使用文档"
        class="font-bold underline"
      >
        使用文档
      </a>
    </p>
    <p
      v-if="showDonate"
      class="mt-2"
    >
      如果觉得这个项目对你有帮助，可以考虑
      <a
        href="https://chilfish.top/sponsors"
        target="_blank"
        title="赞助地址"
        class="font-bold underline"
      >
        赞助我
      </a>
      😇，这将给我更多的动力来维护这个项目
    </p>
  </main>
</template>
