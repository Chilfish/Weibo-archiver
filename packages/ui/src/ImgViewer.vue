<script setup lang="ts">
const viewImg = ref('')

async function onClose() {
  const btn = await waitForElement('.n-image-preview-toolbar')
  const mask = await waitForElement('.n-image-preview-overlay')

  const arr = [btn, mask]

  arr.forEach(e => e?.addEventListener('click', () => {
    viewImg.value = imgViewSrc
  }, { once: true }))
}

watch(viewImg, async () => {
  if (viewImg.value === imgViewSrc)
    return
  const img = await waitForElement<HTMLImageElement>('#img-viewer img')

  img?.click()
  await onClose()
})
</script>

<template>
  <div
    id="img-viewer"
    class="absolute right-0 top-0 hidden"
  >
    <main-image
      class="h-0 w-0"
      :lazy="false"
      :src="viewImg"
    />
  </div>
</template>
