<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  minHeight?: string | number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  lazy?: boolean
}>(), {
  fit: 'contain',
  alt: 'image',
  lazy: true,
})

const realSrc = ref(props.src)
const imgRef = ref<any>()
const disconnectFn = ref<() => void>()
const imgHost = useStorage('imgHost', '/')

watch(imgHost, () => {
  realSrc.value = replaceImg(props.src)

  if (!imgRef.value)
    return
  imgRef.value.imageRef.src = realSrc.value
  imgRef.value.imageRef.parentElement.classList.remove('img-error')
})

async function setImgSrc() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (!imgRef.value)
    return

  const img = imgRef.value.imageRef as HTMLImageElement
  const { disconnect } = lazyLoadImage([img])
  disconnectFn.value = disconnect

  if (!isElectron) {
    realSrc.value = replaceImg(props.src)
    return
  }

  if (import.meta.env.DEV || !props.src.startsWith('/'))
    return

  const config = window.config.data
  realSrc.value = `file://${config.publicPath}${props.src.slice(1)}`
}

watch(() => props.src, setImgSrc)
onMounted(setImgSrc)

onUnmounted(() => {
  disconnectFn.value?.()
})
</script>

<template>
  <n-image
    ref="imgRef"
    lazy
    :fallback-src="ImgPlaceholder"
    :src="lazy ? ImgPlaceholder : realSrc"
    :object-fit="fit"
    :alt="alt"
    :preview-src="realSrc"
    :img-props="{
      class: 'transition-width',
      referrerpolicy: referrerPolicy,
    }"
  />
</template>

<style lang="scss">
$width: 7rem;

.n-image {
  img {
    min-width: $width !important;
    border-radius: 4px;
    height: 100%;
    width: 100%;
  }

  // &:not(.img-error) {
  //   img {
  //     width: auto !important;
  //   }
  // }

  &.img-error {
    // width: $width !important;
    img {
      min-height: $width !important;
    }
  }
}
</style>
