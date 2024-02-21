<script setup lang="ts">
import { isDark, isInMonkey } from '@core'
import {
  NConfigProvider,
  NMessageProvider,
  darkTheme,
  dateZhCN,
  zhCN,
} from 'naive-ui'

// 如果在油猴脚本中，或者不是暗黑模式，不使用暗黑主题
const theme = computed(() => isInMonkey || !isDark.value ? null : darkTheme)
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
  >
    <NMessageProvider>
      <slot />
    </NMessageProvider>
  </NConfigProvider>
</template>
