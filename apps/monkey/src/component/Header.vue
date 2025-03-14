<script setup lang="ts">
import { Minimize2, Settings } from 'lucide-vue-next'
import { useTemplateRef } from 'vue'
import { useConfig } from '../composables/useConfig'
import Logo from './Logo.vue'
import Setting from './Setting.vue'

const { toggleMinimize } = useConfig()

const settingsDialog = useTemplateRef<HTMLDialogElement>('settingsDialog')
</script>

<template>
  <header
    class="flex items-center pb-2"
  >
    <Logo />
    <h2
      class="ml-4 mr-auto flex items-center gap-2"
    >
      <span
        class="text-lg font-bold"
      >
        Weibo archiver
      </span>
    </h2>

    <button
      class="btn-sm btn-ghost btn-circle mr-1 btn"
      @click="settingsDialog?.showModal()"
    >
      <Settings class="h-4 w-4" />
    </button>

    <button
      class="btn-sm btn-ghost btn-circle btn"
      @click="toggleMinimize"
    >
      <Minimize2 class="h-4 w-4" />
    </button>
  </header>

  <dialog
    ref="settingsDialog"
    class="modal"
  >
    <Setting @close="settingsDialog?.close()" />
  </dialog>
</template>
