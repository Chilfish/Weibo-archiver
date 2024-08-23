<script setup lang="ts">
const loaded = ref(false)

onNuxtReady(async () => {
  const publicStore = usePublicStore()
  publicStore.load()
  loaded.value = true
})
</script>

<template>
  <client-only v-if="loaded">
    <Preview />
  </client-only>
  <n-spin
    v-else
    class="center pt-16"
    size="large"
  />
</template>
