<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import LazyImage from './LazyImage.vue'

const previewSrc = ref('')

const imagePreviewDialog = useTemplateRef<HTMLDialogElement>('imagePreviewDialog')

function openImagePreview(src: string) {
  previewSrc.value = src
  imagePreviewDialog.value?.showModal()
}

defineExpose({
  openImagePreview,
})
</script>

<template>
  <dialog
    ref="imagePreviewDialog"
    class="modal"
    aria-label="图片预览"
  >
    <div class="modal-box p-0 max-w-fit">
      <LazyImage
        :key="previewSrc"
        :src="previewSrc"
        skeleton-class="h-128 w-128"
        class="h-[90vh]"
      />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
