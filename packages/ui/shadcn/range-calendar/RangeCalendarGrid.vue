<script lang="ts" setup>
import type { RangeCalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import { RangeCalendarGrid, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<RangeCalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarGrid
    :class="cn(
      'sd-range-calendar-grid',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGrid>
</template>

<style>
.sd-range-calendar-grid {
  @apply w-full border-collapse space-y-1;
}
</style>
