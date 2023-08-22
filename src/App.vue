<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <main class="font-sans">
      <RouterView />
    </main>
  </el-config-provider>
</template>
