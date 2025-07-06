<script setup lang="tsx">
import type {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table'
import type { Following } from '@weibo-archiver/core'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import DataTablePagination
  from '@/components/followings/DataTablePagination.vue'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { valueUpdater } from '@/lib/utils'
import { columns } from './dataColumns'

const props = defineProps<{
  data: Following[]
}>()

const emits = defineEmits<{
  sync: []
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
  },
})

const searchText = computed<string>({
  get: () => table.getColumn('name')?.getFilterValue() as string,
  set: (val: string) => table.getColumn('name')?.setFilterValue(val),
})
</script>

<template>
  <div class="container py-4 mx-auto">
    <div class="flex items-center py-4">
      <slot />

      <Input
        v-model="searchText"
        class="max-w-sm h-10 bg-secondary ml-auto"
        placeholder="搜索用户名……"
      />
    </div>
    <div class="border rounded-xl">
      <Table>
        <TableHeader
          class="bg-card"
        >
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template
            v-if="table.getRowModel().rows?.length"
          >
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class=""
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-4 py-2.5"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell
                :colspan="columns.length"
                class="h-24 text-center"
              >
                暂无结果
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>

<style>
[data-slot="table-container"] {
  border-radius: 0.5rem;
}
</style>
