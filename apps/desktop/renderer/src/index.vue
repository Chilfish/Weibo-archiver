<script lang="ts" setup>
import { FetchIPC } from '#preload'

watchImmediate(isDark, (value) => {
  config.set('theme', value ? 'dark' : 'light')
})

const user1 = ref('')
</script>

<template>
  <div>
    {{ user1 }}
  </div>

  <button
    class="btn"
    @click="async() => {
      const res = await FetchIPC.userInfo('7679065628')
      user1 = JSON.stringify(res)
    }"
  >
    fetch userInfo
  </button>
</template>
