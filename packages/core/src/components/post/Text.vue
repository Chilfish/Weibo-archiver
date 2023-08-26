<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const parsedText = parseProtocol(props.text)

// 或许不该这么写......
onMounted(async () => {
  const btns = await waitForElement('button')

  btns?.forEach(e => e.onclick = () => {
    const url = e.dataset.src
    if (url)
      usePostStore().setViewImg(url)
  })
})
</script>

<template>
  <p
    class="whitespace-pre-wrap break-all text-4 text-black"
    v-html="parsedText"
  />
</template>
