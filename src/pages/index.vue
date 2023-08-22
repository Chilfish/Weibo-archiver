<script setup lang="ts">
const counter = ref(0)
</script>

<template>
  <div absolute right-0 top-0 h-20 w-30 flex>
    <button @click="counter++">
      count is: {{ counter }}
    </button>
  </div>
</template>
