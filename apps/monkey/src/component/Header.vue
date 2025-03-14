<script setup lang="ts">
import { Minimize2 } from 'lucide-vue-next'
import { useConfig } from '../composables/useConfig'
import Logo from './Logo.vue'

const { toggleMinimize } = useConfig()

const {
  VITE_APP_VERSION,
} = import.meta.env
</script>

<template>
  <header
    class="flex items-center gap-2 pb-2"
  >
    <Logo />
    <h2
      class="mr-4 flex items-center gap-2 text-lg font-bold"
    >
      <span>Weibo archiver</span>
      <div
        v-if="VITE_APP_VERSION"
        class="badge badge-primary badge-soft"
      >
        v{{ VITE_APP_VERSION }}
      </div>
    </h2>

    <button
      class="btn-sm btn-ghost ml-auto btn"
      @click="toggleMinimize"
    >
      <Minimize2 class="h-4 w-4" />
    </button>
  </header>
</template>
