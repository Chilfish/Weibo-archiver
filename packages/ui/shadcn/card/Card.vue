<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'sd-card',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style>
.sd-card {
  @apply rounded-xl border bg-card text-card-foreground shadow;
}
</style>
