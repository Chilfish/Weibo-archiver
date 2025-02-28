<script lang="ts" setup>
import type { RangeCalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import { RangeCalendarHeadCell, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<RangeCalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeadCell
    :class="cn(
      'sd-range-calendar-head-cell',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>

<style>
.sd-range-calendar-head-cell {
  @apply w-8 rounded-md text-[0.8rem] font-normal select-none;
}
</style>
