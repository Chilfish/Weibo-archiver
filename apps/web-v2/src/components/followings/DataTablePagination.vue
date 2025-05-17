<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-vue-next'

interface DataTablePaginationProps {
  table: Table<any>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div class="flex items-center justify-end p-2">
    <div
      class="mr-4"
    >
      共{{ table.getRowCount() }}个关注数
    </div>

    <Select
      :model-value="`${table.getState().pagination.pageSize}`"
      @update:model-value="table.setPageSize as unknown as number"
    >
      <SelectTrigger class="h-8">
        <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
      </SelectTrigger>
      <SelectContent side="top">
        <SelectItem
          v-for="pageSize in [10, 20, 30, 40, 50]"
          :key="pageSize"
          :value="`${pageSize}`"
        >
          {{ pageSize }} 条/页
        </SelectItem>
      </SelectContent>
    </Select>

    <div class="flex w-[100px] items-center justify-center text-sm font-medium">
      Page {{ table.getState().pagination.pageIndex + 1 }} of
      {{ table.getPageCount() }}
    </div>

    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        class="w-8 h-8 p-0 flex"
        :disabled="!table.getCanPreviousPage()"
        @click="table.setPageIndex(0)"
      >
        <span class="sr-only">第一页</span>
        <ChevronsLeftIcon class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <span class="sr-only">上一页</span>
        <ChevronLeftIcon class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        <span class="sr-only">下一页</span>
        <ChevronRightIcon class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0 flex"
        :disabled="!table.getCanNextPage()"
        @click="table.setPageIndex(table.getPageCount() - 1)"
      >
        <span class="sr-only">最后一页</span>
        <ChevronsRightIcon class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
