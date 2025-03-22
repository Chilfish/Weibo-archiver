<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const {
  total,
  current,
  pageSize,
  showPageNumbers = 5,
  showSizeChanger = true,
  showJump = true,
  showTotal = true,
  showEndPage = false,
  pageSizeOptions = [10, 20, 50, 100],
} = defineProps<{
  total: number
  current: number
  pageSize: number
  // Maximum page numbers to show
  showPageNumbers?: number
  // Show jump input
  showJump?: boolean
  // Show total
  showTotal?: boolean
  // Show end page
  showEndPage?: boolean
  // Show size changer
  showSizeChanger?: boolean
  // Page size options
  pageSizeOptions?: number[]
}>()

const emit = defineEmits<{
  'update:current': [page: number]
  'update:pageSize': [size: number]
  'change': [page: number, pageSize: number]
}>()

const dotBtn = '...'

const totalPages = computed(() => {
  return Math.ceil(total / pageSize)
})

const isFirstPage = computed(() => current <= 1)
const isLastPage = computed(() => current >= totalPages.value)

const jumpPage = ref(current)

// Responsive design - adjust showPageNumbers based on screen width
const windowWidth = ref(window.innerWidth)
const responsivePageCount = computed(() => {
  if (windowWidth.value < 640)
    return 3 // Small screens
  if (windowWidth.value < 768)
    return 5 // Medium screens
  return showPageNumbers || 7 // Large screens
})

// Handle window resize
function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const displayedPageNumbers = computed(() => {
  const maxPages = responsivePageCount.value
  const total = totalPages.value

  if (total <= maxPages) {
    // If total pages are less than or equal to max, show all pages
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  // Calculate the range of page numbers to display with ellipsis
  let startPage: number, endPage: number

  if (current <= Math.floor(maxPages / 2) + 1) {
    // Current page is close to the beginning
    startPage = 1
    endPage = maxPages - 1
    return [...Array.from({ length: endPage }, (_, i) => i + 1), dotBtn, total]
  }
  else if (current >= total - Math.floor(maxPages / 2)) {
    // Current page is close to the end
    startPage = total - maxPages + 2
    endPage = total
    return [1, dotBtn, ...Array.from({ length: maxPages - 1 }, (_, i) => startPage + i)]
  }
  else {
    // Current page is in the middle
    startPage = current - Math.floor((maxPages - 3) / 2)
    endPage = current + Math.ceil((maxPages - 3) / 2)
    return [1, dotBtn, ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), dotBtn, total]
  }
})

function changePage(page: number) {
  if (page < 1 || page > totalPages.value || page === current) {
    return
  }

  emit('update:current', page)
  emit('change', page, pageSize)
}

function changePageSize(size: number) {
  if (size === pageSize)
    return

  const newPageCount = Math.ceil(total / size)
  const newPage = current > newPageCount ? newPageCount : current

  emit('update:pageSize', size)
  emit('update:current', newPage)
  emit('change', newPage, size)
}

function goToFirstPage() {
  if (!isFirstPage.value) {
    changePage(1)
  }
}

function goToPrevPage() {
  if (!isFirstPage.value) {
    changePage(current - 1)
  }
}

function goToNextPage() {
  if (!isLastPage.value) {
    changePage(current + 1)
  }
}

function goToLastPage() {
  if (!isLastPage.value) {
    changePage(totalPages.value)
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2">
    <div class="join">
      <button
        v-if="showEndPage"
        class="join-item btn"
        :class="{ 'btn-disabled': isFirstPage }"
        :disabled="isFirstPage"
        title="第一页"
        aria-label="第一页"
        @click="goToFirstPage"
      >
        <ChevronsLeft class="w-4 h-4" />
      </button>

      <button
        class="join-item btn"
        :class="{ 'btn-disabled': isFirstPage }"
        :disabled="isFirstPage"
        title="上一页"
        aria-label="上一页"
        @click="goToPrevPage"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
    </div>

    <div class="join">
      <template v-for="(page, index) in displayedPageNumbers" :key="index">
        <button
          v-if="page !== dotBtn"
          class="join-item btn"
          :class="{ 'btn-active': page === current }"
          :aria-label="`跳转至第${page}页`"
          @click="changePage(Number(page))"
        >
          {{ page }}
        </button>
        <button
          v-else
          class="join-item btn btn-disabled"
          aria-label="更多"
        >
          <Ellipsis class="w-4 h-4" />
        </button>
      </template>
    </div>

    <div class="join">
      <button
        class="join-item btn"
        :class="{ 'btn-disabled': isLastPage }"
        :disabled="isLastPage"
        title="下一页"
        aria-label="下一页"
        @click="goToNextPage"
      >
        <ChevronRight class="w-4 h-4" />
      </button>

      <button
        v-if="showEndPage"
        class="join-item btn"
        :class="{ 'btn-disabled': isLastPage }"
        :disabled="isLastPage"
        title="最后一页"
        aria-label="最后一页"
        @click="goToLastPage"
      >
        <ChevronsRight class="w-4 h-4" />
      </button>
    </div>

    <div
      v-if="showJump"
      class="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1"
    >
      跳转至第
      <input
        v-model="jumpPage"
        type="number"
        class="input input-bordered w-16 h-8"
        min="1"
        :max="totalPages"
        aria-label="跳转页码"
        @keydown.enter="changePage(Number(jumpPage))"
      > 页
    </div>

    <div
      v-if="showTotal"
      class="text-sm text-gray-500 whitespace-nowrap"
      aria-label="总条数"
    >
      共 {{ total }} 条
    </div>

    <!-- Page size selector -->
    <select
      v-if="showSizeChanger"
      class="select select-bordered w-fit h-8"
      :value="pageSize"
      aria-label="每页条数"
      @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="size in pageSizeOptions" :key="size" :value="size">
        {{ size }} 条/页
      </option>
    </select>
  </div>
</template>
