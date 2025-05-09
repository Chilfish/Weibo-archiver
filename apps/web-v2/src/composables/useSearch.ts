import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface SearchOpts {
  withText: boolean
  withImage: boolean
  withOriginal: boolean
  withRepost: boolean
  dateFrom: DateValue | undefined
  dateTo: DateValue | undefined
}

export interface SearchQuery {
  searchText: string
  withText: boolean
  withImage: boolean
  withOriginal: boolean
  withRepost: boolean
  dateFrom: Date | undefined
  dateTo: Date | undefined
}

export const defaultSearchOpts: SearchOpts = {
  withText: true,
  withImage: true,
  withOriginal: true,
  withRepost: true,
  dateFrom: undefined,
  dateTo: undefined,
}

export function useSearch() {
  const route = useRoute()
  const dateRangeShortcutDiff = ref(0)
  const searchOptions = ref<SearchOpts>({ ...defaultSearchOpts })
  const searchText = ref<string>(route.query.q as string || '')
  const now = today(getLocalTimeZone())

  watch([
    () => searchOptions.value.dateFrom,
    () => searchOptions.value.dateTo,
  ], ([from, to]) => {
    if (!from || !to) {
      return
    }

    const toDate = to.toDate('Asia/Shanghai').getTime()
    const fromDate = from.toDate('Asia/Shanghai').getTime()
    const diff = (toDate - fromDate) / 1000 / 60 / 60 / 24

    if (diff !== dateRangeShortcutDiff.value) {
      dateRangeShortcutDiff.value = 0
    }
  })

  function resetOptions() {
    searchOptions.value = { ...defaultSearchOpts }
    resetDateRange()
  }

  function setDateRangeShortcut(diff: number) {
    dateRangeShortcutDiff.value = diff
    searchOptions.value.dateTo = now
    searchOptions.value.dateFrom = now.subtract({ days: diff })
  }

  function resetDateRange() {
    dateRangeShortcutDiff.value = 0
    searchOptions.value.dateFrom = undefined
    searchOptions.value.dateTo = undefined
  }

  function toSearchQuery(): SearchQuery {
    const { withText, withRepost, withImage, withOriginal, dateFrom, dateTo } = searchOptions.value

    return {
      searchText: searchText.value,
      withText,
      withImage,
      withOriginal,
      withRepost,
      dateFrom: dateFrom?.toDate('Asia/Shanghai'),
      dateTo: dateTo?.toDate('Asia/Shanghai'),
    }
  }

  return {
    searchText,
    searchOptions,
    dateRangeShortcutDiff,
    resetDateRange,
    resetOptions,
    setDateRangeShortcut,
    toSearchQuery,
  }
}
