<script setup lang="ts">
import AppMain from '@weibo-archiver/ui/AppMain.vue'
import Ctrl from './Ctrl.vue'
</script>

<template>
  <AppMain>
    <Suspense>
      <Ctrl />
    </Suspense>
  </AppMain>
</template>
