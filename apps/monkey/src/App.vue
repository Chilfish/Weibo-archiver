<script setup lang="ts">
import AppMain from '@ui/AppMain.vue'
import Ctrl from './Ctrl.vue'

import 'uno.css'
import '@ui/shared.css'
</script>

<template>
  <AppMain>
    <Ctrl />
  </AppMain>
</template>

<style lang="scss">
.n-base-clear {
  display: none !important;
}

#plugin-app {
 &,
 & p {
   font-size: 13px;
  }
}
</style>
