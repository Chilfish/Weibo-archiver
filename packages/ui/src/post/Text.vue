<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const publicStore = usePublicStore()

const parsedText = parseProtocol(props.text)
  .replace('https:https:', 'https:') // a patch ...
  .replace(/\/\/weibo.cn\/sinaurl\?u=(.+)/, (_, href) => decodeURIComponent(href)) // 去掉微博的链接跳转
const textRef = ref<HTMLParagraphElement | null>(null)

onMounted(() => {
  textRef.value!.addEventListener('click', (e) => {
    let target = e.target as any
    if (target.tagName === 'SPAN')
      target = target.parentNode

    if (target.tagName !== 'BUTTON')
      return

    const src = target.dataset.src
    publicStore.globalImg = src
  })
})
</script>

<template>
  <p
    ref="textRef"
    class="text whitespace-pre-wrap break-all text-4 text-black"
    v-html="parsedText"
  />
</template>

<style>
p.text button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
</style>
