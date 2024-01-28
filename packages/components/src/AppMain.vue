<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  darkTheme,
  dateZhCN,
  zhCN,
} from 'naive-ui'

const isDark = useDark({
  storageKey: 'theme',
  disableTransition: false,
})
const theme = computed(() => isDark.value ? darkTheme : null)
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
