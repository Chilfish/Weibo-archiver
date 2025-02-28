<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import {
  ProgressIndicator,
  ProgressRoot,

} from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(),
  {
    modelValue: 0,
  },
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'sd-progress',
        props.class,
      )
    "
  >
    <ProgressIndicator
      class="sd-progress-indicator"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>

<style>
.sd-progress {
  @apply relative h-2 w-full overflow-hidden rounded-full bg-primary/20;
}

.sd-progress-indicator {
  @apply h-full w-full flex-1 bg-primary transition-all;
}
</style>
