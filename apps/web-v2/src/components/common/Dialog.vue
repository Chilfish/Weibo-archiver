<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useId } from 'vue'

const {
  id = useId(),
  title,
  message,
  showConfirm = false,
  confirmText = '确认',
  cancelText = '取消',
  confirmClass = 'btn-primary',
  closeOnOutside = true,
} = defineProps<{
  id?: string
  title?: string
  message?: string
  showConfirm?: boolean
  confirmText?: string
  cancelText?: string
  confirmClass?: string
  closeOnOutside?: boolean
}>()

const emit = defineEmits<{
  close: []
  confirm: []
  cancel: []
}>()

const open = defineModel<boolean>('open', { required: true })

function onClose() {
  emit('close')
  open.value = false
}

function onConfirm() {
  emit('confirm')
  onClose()
}

function onCancel() {
  emit('cancel')
  onClose()
}
</script>

<template>
  <dialog
    :id="id"
    :open="open"
    class="modal"
  >
    <form
      method="dialog"
      class="modal-action" :class="[{ 'modal-backdrop': closeOnOutside }]"
    >
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="onClose"
      >
        <X class="w-4 h-4" />
      </button>
    </form>
    <div class="modal-box">
      <div class="modal-body flex flex-col gap-4">
        <h3 class="text-lg font-bold">
          {{ title }}
        </h3>
        <p v-if="message">
          {{ message }}
        </p>

        <slot />

        <div
          v-if="showConfirm"
          class="flex gap-2 justify-end"
        >
          <button
            class="btn"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="btn" :class="[confirmClass]"
            @click="onConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>
