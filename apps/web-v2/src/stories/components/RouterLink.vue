<script setup lang="ts">
defineOptions({
  name: 'RouterLink',
})

// 兼容storybook不能使用router-link的问题
</script>

<template>
  <a>
    <slot />
  </a>
</template>
