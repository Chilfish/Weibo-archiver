<script lang="ts" setup>
import { UserIPC } from '#preload'

watchImmediate(isDark, (value) => {
  config.set('theme', value ? 'dark' : 'light')
})
</script>

<template>
  <p class="text-xl">
    App version: {{ configRef.version }}
  </p>

  <div class="flex gap-4">
    <Dark />
    <Button>Naive UI</Button>

    <ReactiveCounter />
  </div>

  <div>
    <p>
      Configs:
      {{ configRef }}
    </p>
  </div>

  <File />
  <ReactiveHash />

  <Sqlite
    :user-service="UserIPC"
  />
</template>
