<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { windowClient } from '@/composables'

const data = ref({})

onMounted(async () => {
  data.value = await windowClient.fetchMe()
})
</script>

<template>
  <div>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<style scoped>

</style>
