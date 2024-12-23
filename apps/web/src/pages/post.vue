<script setup lang="ts">
import { usePublicStore } from '@core/stores'
import { onMounted, ref } from 'vue'

const loaded = ref(false)

onMounted(async () => {
  const publicStore = usePublicStore()
  publicStore.load()
  loaded.value = true
})
</script>

<template>
  <Preview v-if="loaded" />
  <n-spin
    v-else
    class="center pt-16"
    size="large"
  />
</template>
