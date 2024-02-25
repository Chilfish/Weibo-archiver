<script lang="ts" setup>
import { FetchIPC } from '#preload'

const router = useRouter()

watchImmediate(isDark, (value) => {
  config.set('theme', value ? 'dark' : 'light')
})

const user1 = ref('')

const cookie = configRef.value.fetchOptions.cookie
if (!cookie)
  router.push('/intro')
</script>

<template>
  <main class="p-4">
    <pre>
      {{ user1 }}
    </pre>

    <button
      class="btn"
      @click="async() => {
        const res = await FetchIPC.userInfo('1111681197')
        user1 = JSON.stringify(res, null, 2)
      }"
    >
      fetch userInfo
    </button>
  </main>
</template>
