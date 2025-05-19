<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  SortAscIcon,
  SortDescIcon,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps {
  column: Column<any, unknown>
  title: string
}

defineOptions({
  inheritAttrs: false,
})

defineProps<DataTableColumnHeaderProps>()
</script>

<template>
  <div
    v-if="column.getCanSort()"
    :class="cn('flex items-center justify-center space-x-2', $attrs.class ?? '')"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>
            {{ title }}
          </span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="w-4 h-4 ml-2"
          />
          <ArrowUpIcon
            v-else-if=" column.getIsSorted() === 'asc'"
            class="w-4 h-4 ml-2"
          />
          <ChevronsUpDownIcon
            v-else
            class="w-4 h-4 ml-2"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          @click="column.toggleSorting(false)"
        >
          <SortAscIcon
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          升序
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="column.toggleSorting(true)"
        >
          <SortDescIcon
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          降序
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div
    v-else
    :class="$attrs.class"
  >
    {{ title }}
  </div>
</template>
