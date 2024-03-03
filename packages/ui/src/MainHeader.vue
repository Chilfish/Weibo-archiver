<script setup lang="ts">
import { useModal } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import SettingsWeb from './settings/web.vue'
import SettingsDesktop from './settings/desktop.vue'

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
  router.push(`/search?q=${searchInput.value}&page=1&pageSize=10`)
}

onMounted(() => {
  searchInput.value = route.query?.q?.toString() || ''
})

const modal = useModal()

function openSettings() {
  modal.create({
    content: () => import.meta.env.VITE_IS_ELECTRON
      ? h(SettingsDesktop)
      : h(SettingsWeb),
    preset: 'dialog',
    showIcon: false,
  })
}

onUnmounted(() => {
  modal.destroyAll()
})
</script>

<template>
  <header
    :style="headerStyle"
    class="fixed z-99 h-16 w-full flex items-center gap-4 bg-[#69696A30] px-4 backdrop-blur-8 transition-all sm:px-8"
  >
    <router-link
      class="i-tabler-brand-weibo icon h-6 w-6"
      :to="`/post?page=1&pageSize=${route.query.pageSize || 10}`"
      title="返回首页"
    />

    <form
      class="relative mr-auto h-12 min-w-2/5"
      @submit.prevent="search"
    >
      <i
        class="i-tabler-search absolute left-3 top-50% icon translate-y-[-50%]"
        @click="search"
      />
      <input
        v-model="searchInput"
        class="w-full rounded-2 bg-gray-100 p-3 pl-9 text-4 dark:bg-dark-700"
        placeholder="搜索微博"
      >
    </form>

    <button
      class="rounded-2 p-1.6"
      hover:bg="light-200 dark:dark-200"
      title="打开设置"
      @click="openSettings"
    >
      <i class="i-tabler:settings icon h-6 w-6" />
    </button>
  </header>
</template>
