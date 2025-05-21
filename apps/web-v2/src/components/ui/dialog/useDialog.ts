import type { DialogOptions } from './DialogProvider.vue'
import { inject } from 'vue'

interface DialogControl {
  openDialog: (id: string, options: DialogOptions) => void
  closeDialog: (id: string) => void
  registerDialog: (id: string) => void
  dialogs: Record<string, { open: boolean, options: DialogOptions | null }>
}

export function useDialog() {
  const dialogControl = inject<DialogControl>('dialogs')

  if (!dialogControl) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return [
    dialogControl.openDialog,
    dialogControl.closeDialog,
    dialogControl.registerDialog,
    dialogControl.dialogs,
  ] as const
}
