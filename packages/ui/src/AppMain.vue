<script setup lang="ts">
import { isDark } from '@core/composables'
import { isInMonkey } from '@core/utils'
import {
  darkTheme,
  dateZhCN,
  NConfigProvider,
  NMessageProvider,
  NModalProvider,
  zhCN,
} from 'naive-ui'
import { computed } from 'vue'

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
