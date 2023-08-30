<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@weibo-archiver/stores'

const { y } = useWindowScroll()
const isScrollingDown = ref(false)
watch(
  () => y.value,
  (newY, oldY) => {
    isScrollingDown.value = newY > oldY
  },
)

const headerStyle = computed(() => {
  return {
    transform: isScrollingDown.value ? 'translateY(-100%)' : '',
  }
})

const searchInput = ref(useRoute().query?.q?.toString() || '')
const router = useRouter()

async function search() {
  const res = await usePostStore().searchText(searchInput.value)
  if (res.length)
    router.push(`/s?q=${searchInput.value}`)
}

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header
    :style="headerStyle"
    class="fixed top-0 z-999 h-16 w-full flex items-center gap-4 bg-[#69696A30] px-6 backdrop-blur-8 transition-all"
  >
    <span
      class="icon i-tabler-brand-weibo"
      @click="$router.push('/p/1')"
    />

    <form
      class="relative ml-4 mr-auto h-12 w-3/5 sm:w-2/5"
      @submit.prevent="search"
    >
      <span
        class="icon i-tabler-search absolute left-3 top-50% translate-y-[-50%]"
        @click="search"
      />
      <input
        v-model="searchInput"
        class="w-full rounded-2 bg-gray-100 p-3 pl-9 text-4 dark:bg-dark-700"
        placeholder="搜索我的微博"
      >
    </form>

    <button
      class="btn"
      @click="toggleDark()"
    >
      {{ isDark ? '日间' : '夜间' }}
    </button>
  </header>
</template>
