<script lang="ts" setup>
import { UserIPC } from '#preload'

watchImmediate(isDark, (value) => {
  config.set('theme', value ? 'dark' : 'light')
})

const message = useMessage()
</script>

<template>
  <p class="text-xl">
    App version: {{ configRef.version }}
  </p>

  <div class="flex gap-4">
    <Dark />
    <button
      class="text-red"
      @click="() => {
        message.info('hello')
      }"
    >
      naive-ui
    </button>
  </div>

  <p>
    Configs: {{ configRef }}
  </p>

  <File />

  <Sqlite
    :user-service="UserIPC"
  />
</template>
