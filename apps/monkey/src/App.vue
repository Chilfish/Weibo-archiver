<script setup lang="ts">
import AppMain from '@ui/AppMain.vue'
import Ctrl from './Ctrl.vue'
</script>

<template>
  <AppMain>
    <Suspense>
      <Ctrl />
    </Suspense>
  </AppMain>
</template>
