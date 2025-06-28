<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'

type Props = PrimitiveProps & /* @vue-ignore */ Partial<ButtonHTMLAttributes> & {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const emits = defineEmits<{
  click: [e: Event]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Primitive
    data-slot="button"
    :class="cn(
      buttonVariants({ variant, size }),
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>
