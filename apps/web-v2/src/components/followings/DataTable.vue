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
      <p
        class="mr-4"
      >
        共有{{ table.getRowCount() }}个关注
      </p>

      <Input
        class="max-w-sm h-10 bg-secondary ml-auto"
        placeholder="搜索用户名……"
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
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
