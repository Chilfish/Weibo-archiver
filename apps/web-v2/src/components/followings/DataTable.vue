<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import DataTablePagination from './DataTablePagination.vue'

const props = defineProps<{
  columns: ColumnDef<any, unknown>[]
  data: any[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
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
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm bg-secondary"
        placeholder="搜索用户名……"
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
      />
    </div>
    <div class="border rounded-2xl">
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
              class="bg-secondary"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
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
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
