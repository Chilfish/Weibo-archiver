<script setup lang="ts">
watchImmediate(isDark, (value) => {
  window.config.set('theme', value ? 'dark' : 'light')
})
</script>

<template>
  <AppMain>
    <main class="flex flex-col gap-2">
      <RouterView />
    </main>
  </AppMain>
</template>

<style scoped>
main {
  height: calc(100dvh - 30px);
}
</style>
