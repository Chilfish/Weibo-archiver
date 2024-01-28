<script setup lang="ts">
const postStore = usePostStore()

async function onClose() {
  const btn = await waitForElement('.n-image-preview-toolbar')
  const mask = await waitForElement('.n-image-preview-overlay')

  const arr = [btn, mask]

  arr.forEach(e => e?.addEventListener('click', () => {
    postStore.viewImg = imgViewSrc
  }, { once: true }))
}

watch(() => postStore.viewImg, async () => {
  if (postStore.viewImg === imgViewSrc)
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
    <ui-image
      class="h-0 w-0"
      :src="postStore.viewImg"
    />
  </div>
</template>
