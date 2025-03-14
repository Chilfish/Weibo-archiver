<script setup lang="ts">
import ExportButtons from './component/ExportButtons.vue'
import Header from './component/Header.vue'
import Logo from './component/Logo.vue'
import Options from './component/Options.vue'
import Search from './component/Search.vue'

import { config, useConfig } from './composables/useConfig'

const { toggleMinimize } = useConfig()
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="fixed-card bg-base-200 w-96 gap-2 overflow-x-hidden overflow-y-auto border-2 border-gray-200 rounded-lg p-4 shadow-2xl space-y-2"
    data-theme="light"
  >
    <Header />
    <Search />
    <Options />
    <div class="divider" />
    <ExportButtons />
  </div>

  <div
    v-show="config.isMinimize"
    class="fixed-card w-16 shadow-xl p-2!"
    @click="toggleMinimize"
  >
    <Logo />
  </div>
</template>

<style scoped>
#plugin-app {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 100%;
}

:root {
  font-size: 14px;
}

p {
  color: black !important;
}

.fixed-card {
  position: fixed;
  right: 1rem;
  top: 5rem;
  transition: all 0.3s ease-in-out;
  max-height: 80vh;
  z-index: 1000;
}

.fixed-card::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.fixed-card::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: transparent;
}
.fixed-card::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #7a797963;
}
.fixed-card {
  scrollbar-width: thin !important;
}
</style>
