<script setup lang="ts">
import { Toaster } from '@workspace/ui/shadcn/toast'
import { TooltipProvider } from '@workspace/ui/shadcn/tooltip'
import Ctrl from './Ctrl.vue'
</script>

<template>
  <TooltipProvider>
    <Ctrl />
    <Toaster />
  </TooltipProvider>
</template>

<style>
#plugin-app {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 100%;
}

:root {
  font-size: 14px;
}
</style>
