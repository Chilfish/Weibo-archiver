<script setup lang="ts">
import { Settings } from 'lucide-vue-next'
import { useTemplateRef } from 'vue'
import Setting from '../settings/Settings.vue'

const settingsDialog = useTemplateRef<HTMLDialogElement>('settingsDialog')
</script>

<template>
  <button
    class="btn btn-ghost btn-sm rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500"
    @click="settingsDialog?.showModal()"
  >
    <Settings class="h-4 w-4" />
    <span>设置</span>
  </button>

  <dialog
    ref="settingsDialog"
    class="modal"
  >
    <Setting
      class="modal-box"
      @close="settingsDialog?.close()"
    />
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
