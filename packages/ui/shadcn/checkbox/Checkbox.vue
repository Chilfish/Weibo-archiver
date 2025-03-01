<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@workspace/shared/lib/utils'
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="cn('sd-checkbox', props.class)"
  >
    <CheckboxIndicator
      as="div"
      class="sd-checkbox-indicator"
    >
      <slot>
        <Check class="h-full w-full text-white" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style>
.sd-checkbox {
  @apply relative h-5 w-5 shrink-0 rounded-sm border border-gray-400 bg-white shadow transition-colors duration-200 cursor-pointer p-0
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    data-[state=checked]:border-primary data-[state=checked]:bg-primary;
}

.sd-checkbox-indicator {
  @apply flex h-full w-full items-center justify-center;
}
</style>
