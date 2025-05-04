<script setup lang="ts">
import type { Component } from 'vue'
import { provide, reactive } from 'vue'
import Dialog from './Dialog.vue'
import DialogContent from './DialogContent.vue'
import DialogDescription from './DialogDescription.vue'
import DialogFooter from './DialogFooter.vue'
import DialogHeader from './DialogHeader.vue'
import DialogTitle from './DialogTitle.vue'

export interface DialogOptions {
  component: Component
  footer?: Component
  props?: Record<string, any>
  onClose?: () => void
  class?: string
  id?: string
  showClose?: boolean
}

const dialogs = reactive<
  Record<string, { open: boolean, options: DialogOptions | null }>
>({})

function registerDialog(id: string) {
  if (!dialogs[id]) {
    dialogs[id] = { open: false, options: null }
  }
}

function openDialog(id: string, options: DialogOptions) {
  registerDialog(id)
  dialogs[id].options = options
  dialogs[id].open = true
}

function closeDialog(id: string) {
  if (dialogs[id]) {
    dialogs[id].open = false
    dialogs[id].options?.onClose?.()
  }
}

provide('dialogs', {
  openDialog,
  closeDialog,
  registerDialog,
  dialogs,
})
</script>

<template>
  <slot />

  <template
    v-for="(dialog, id) in dialogs"
    :key="id"
  >
    <Dialog
      v-if="dialog.options"
      v-model:open="dialog.open"
      @update:open="(value) => !value && closeDialog(id)"
    >
      <DialogContent
        :id="dialog.options?.id"
        :class="dialog.options?.class"
        :show-close="dialog.options?.showClose"
      >
        <DialogHeader>
          <DialogTitle>{{ dialog.options?.props?.title }}</DialogTitle>
          <DialogDescription>{{ dialog.options?.props?.description }}</DialogDescription>
        </DialogHeader>

        <component
          :is="dialog.options?.component"
          v-bind="dialog.options?.props || {}"
          @close="closeDialog(id)"
        />

        <DialogFooter>
          <component :is="dialog.options?.footer" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </template>
</template>
