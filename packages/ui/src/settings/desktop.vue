<script setup lang="ts">

</script>

<template>
  <n-tabs
    type="card"
    animated
    class="min-h-50vh md:w-60vw"
  >
    <n-tab-pane name="settings" tab="设置">
      <settings-base />
    </n-tab-pane>

    <n-tab-pane name="about" tab="关于">
      <settings-about />
    </n-tab-pane>
  </n-tabs>
</template>
