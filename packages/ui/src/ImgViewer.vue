<script setup lang="ts">
import { imgViewSrc } from '@core/constants'
import { storeToRefs } from 'pinia'

const { globalImg } = storeToRefs(usePublicStore())

const imgRef = ref<HTMLImageElement | null>(null)

async function onClose() {
  const btn = await waitForElement('.n-image-preview-toolbar')
  const mask = await waitForElement('.n-image-preview-overlay')

  const arr = [btn, mask]

  arr.forEach(e => e?.addEventListener('click', () => {
    globalImg.value = imgViewSrc
  }))
}

watch(globalImg, async () => {
  if (globalImg.value === imgViewSrc)
    return

  imgRef.value?.click()

  const img = await waitForElement<HTMLImageElement>('img.n-image-preview')

  if (!img)
    return
  img.src = replaceImg(globalImg.value)
  await onClose()
})

onMounted(() => {
  imgRef.value = document.querySelector<HTMLImageElement>('#img-viewer img')
})
</script>

<template>
  <main-image
    id="img-viewer"
    class="absolute right-0 top-0 hidden h-0 w-0"
    :lazy="false"
    :src="imgViewSrc"
  />
</template>
