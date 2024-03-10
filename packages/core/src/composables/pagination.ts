import { useRoute, useRouter } from 'vue-router'

export function usePagination(
  maxPage: () => number,
) {
  const router = useRouter()
  const route = useRoute()

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 20)

  function pushPage(page: number) {
    router.push({
      query: {
        ...route.query,
        page: page || 1,
        pageSize: pageSize.value,
      },
    })
  }

  watchEffect(() => {
    if (curPage.value < 1)
      curPage.value = 1
    else if (curPage.value > maxPage())
      curPage.value = maxPage()

    pushPage(curPage.value)
  })

  watchImmediate(() => route.query, (newVal) => {
    const routePageSize = Number(newVal.pageSize) || 20
    pageSize.value = routePageSize

    const routePage = Number(newVal.page) || 1
    curPage.value = routePage
  })

  return {
    curPage,
    pageSize,
    pushPage,
  }
}
