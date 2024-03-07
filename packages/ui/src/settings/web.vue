<script setup lang="ts">
window.$message = useMessage()
</script>

<template>
  <n-tabs
    type="card"
    animated
    class="min-h-40vh min-w-80vw md:min-w-50vw"
  >
    <n-tab-pane name="settings" tab="设置">
      <settings-base />
    </n-tab-pane>

    <n-tab-pane name="multi-user" tab="账号">
      <settings-multi-user />
    </n-tab-pane>

    <n-tab-pane name="about" tab="关于">
      <settings-about />
    </n-tab-pane>
  </n-tabs>
</template>
