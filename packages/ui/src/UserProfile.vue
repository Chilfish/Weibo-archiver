<script setup lang="ts">
import type { UserInfo } from '@types'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <div>
    {{ user }}
  </div>
</template>
