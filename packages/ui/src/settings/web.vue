<script setup lang="ts">
import { useMessage } from 'naive-ui'

window.$message = useMessage()
</script>

<template>
  <n-tabs
    type="card"
    animated
    class="min-h-40vh"
  >
    <n-tab-pane name="settings" tab="设置">
      <settings-base />
    </n-tab-pane>

    <n-tab-pane name="multi-user" tab="用户管理">
      <settings-multi-user />
    </n-tab-pane>

    <n-tab-pane name="about" tab="关于">
      <settings-about />
    </n-tab-pane>
  </n-tabs>
</template>
