<script setup lang="ts">
import {
  darkTheme,
  dateZhCN,
  NConfigProvider,
  NMessageProvider,
  NModalProvider,
  zhCN,
} from 'naive-ui'

// 如果在油猴脚本中，或者不是暗黑模式，不使用暗黑主题
const theme = computed(() => isInMonkey || !isDark.value ? null : darkTheme)
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme
  >
    <NModalProvider>
      <NMessageProvider>
        <slot />
      </NMessageProvider>
    </NModalProvider>
  </NConfigProvider>
</template>
