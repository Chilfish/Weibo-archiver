<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import index from './index.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Suspense>
      <index />
    </Suspense>
  </el-config-provider>
</template>
