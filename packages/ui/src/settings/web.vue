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

    <n-tab-pane name="switch-user" tab="用户管理">
      <user-switch />
    </n-tab-pane>

    <n-tab-pane name="followings" tab="关注列表">
      <keep-alive>
        <user-followings />
      </keep-alive>
    </n-tab-pane>

    <n-tab-pane name="about" tab="关于">
      <settings-about />
    </n-tab-pane>
  </n-tabs>
</template>
