<script setup lang="ts">
import { isDark } from '@weibo-archiver/core'
import { useRoute, useRouter } from 'vue-router'

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

const router = useRouter()
const route = useRoute()
const searchInput = ref(route.query?.q?.toString() || '')

async function search() {
  const res = await usePostStore().searchText(searchInput.value)
  if (res.length)
    router.push(`/s?q=${searchInput.value}`)
}

const toggleDark = useToggle(isDark)

onMounted(() => {
  searchInput.value = route.query?.q?.toString() || ''
})
</script>

<template>
  <header
    :style="headerStyle"
    class="fixed top-0 z-999 h-16 w-full flex items-center gap-4 bg-[#69696A30] px-6 backdrop-blur-8 transition-all"
  >
    <span
      class="i-tabler-brand-weibo icon"
      @click="$router.push('/p/1')"
    />

    <form
      class="relative ml-4 mr-auto h-12 w-3/5 sm:w-2/5"
      @submit.prevent="search"
    >
      <span
        class="i-tabler-search absolute left-3 top-50% icon translate-y-[-50%]"
        @click="search"
      />
      <input
        v-model="searchInput"
        class="w-full rounded-2 bg-gray-100 p-3 pl-9 text-4 dark:bg-dark-700"
        placeholder="搜索我的微博"
      >
    </form>

    <button
      @click="toggleDark()"
    >
      <span
        :i-tabler="isDark ? 'moon' : 'sun'"
        class="icon"
      />
    </button>
  </header>
</template>
