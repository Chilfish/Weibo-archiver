<script setup lang="ts">
const postStore = usePostStore()

watch(() => postStore.viewImg, async () => {
  if (postStore.viewImg === imgViewSrc)
    return
  const img = await waitForElement<HTMLImageElement>('#img-viewer img')
  img?.[0]?.click()
})
</script>

<template>
  <div
    id="img-viewer"
    class="absolute right-0 top-0"
  >
    <ui-image
      class="h-0 w-0"
      :src="replaceImg(postStore.viewImg)"
    />
  </div>
</template>
