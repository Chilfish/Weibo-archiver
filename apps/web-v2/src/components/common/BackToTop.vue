<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { ArrowUp } from 'lucide-vue-next'
import { computed } from 'vue'

const { y } = useWindowScroll()
const isShow = computed(() => y.value > 100)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div
    class="fixed bottom-4 right-4 md:bottom-12 md:right-12 transition-opacity duration-300 z-10 select-none" :class="[
      {
        'opacity-0': !isShow,
      },
    ]"
  >
    <button
      class="btn btn-circle md:btn-lg"
      @click="scrollToTop"
    >
      <ArrowUp class="w-6 h-6 md:w-8 md:h-8" />
    </button>
  </div>
</template>
