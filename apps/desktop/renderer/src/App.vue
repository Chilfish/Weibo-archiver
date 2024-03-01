<script setup lang="ts">
watchImmediate(isDark, (value) => {
  window.config.set('theme', value ? 'dark' : 'light')
})
</script>

<template>
  <AppMain>
    <n-modal-provider>
      <main class="flex flex-col gap-2">
        <RouterView />
      </main>
      <img-viewer />
    </n-modal-provider>
  </AppMain>
</template>

<style scoped>
main {
  height: calc(100dvh - 30px);
}
</style>
