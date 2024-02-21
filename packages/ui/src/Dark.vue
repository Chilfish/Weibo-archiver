<script setup lang="ts">
const toggleDark = useToggle(isDark)
const icon = computed(() => (isDark.value ? 'i-tabler-moon' : 'i-tabler-sun'))
</script>

<template>
  <button @click="toggleDark()">
    <i :class="icon" />
  </button>
</template>
