import { useRoute, useRouter } from 'vue-router'

export function usePagination(
  maxPage: () => number,
) {
  const router = useRouter()
  const route = useRoute()
  const path = ref(route.path.replace(/\/\d+$/, ''))
  const query = ref(route.query)

  const curPage = ref(Number(route.params.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 20)

  function pushPage(page: number) {
    router.push({
      path: `${path.value}/${page || 1}`,
      query: {
        ...query.value,
        pageSize: pageSize.value,
      },
      hash: route.hash,
    })
  }

  watchImmediate([pageSize, curPage], ([_, newCurPage]) => {
    if (newCurPage < 1)
      newCurPage = 1
    else if (newCurPage > maxPage())
      newCurPage = maxPage()

    pushPage(newCurPage)
  })

  watch(() => (route.query.pageSize as string), (newVal) => {
    const routePageSize = Number.parseInt(newVal) || 20
    pageSize.value = routePageSize
  })

  watch(() => (route.params.page as string), (newVal) => {
    const routePage = Number.parseInt(newVal) || 1
    curPage.value = routePage
  })

  return {
    curPage,
    pageSize,
  }
}
