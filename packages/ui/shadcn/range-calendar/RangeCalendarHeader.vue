<script lang="ts" setup>
import type { RangeCalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import { RangeCalendarHeader, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeader
    :class="cn(
      'sd-range-calendar-header',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeader>
</template>

<style>
.sd-range-calendar-header {
  @apply relative flex w-full items-center justify-between pt-1;
}
</style>
