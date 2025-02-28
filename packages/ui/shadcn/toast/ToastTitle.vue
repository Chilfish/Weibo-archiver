<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import { ToastTitle } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastTitle v-bind="delegatedProps" :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)">
    <slot />
  </ToastTitle>
</template>
