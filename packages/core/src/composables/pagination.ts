import { useRoute, useRouter } from 'vue-router'

export function usePagination() {
  const postStore = usePostStore()
  const router = useRouter()
  const route = useRoute()
  const path = ref(route.path.replace(/\/\d+$/, '') || '/p/1')
  const query = ref(route.query)

  const pageSize = ref(postStore.postsPerPage)
  const curPage = ref(postStore.curPage)

  function pushPage(page: number) {
    router.push({
      path: `${path.value}/${page}`,
      query: {
        ...query.value,
        pageSize: pageSize.value,
      },
    })
    postStore.curPage = page
  }

  watch([pageSize, curPage], ([newPageSize, newCurPage]) => {
    pushPage(newCurPage)
    postStore.postsPerPage = newPageSize
  })

  watchEffect(() => {
    const query = route.query
    const routePageSize = Number.parseInt(query.pageSize as string) || postStore.postsPerPage
    postStore.postsPerPage = routePageSize
    pageSize.value = routePageSize
  })

  watchEffect(() => {
    const params = route.params
    const routePage = Number.parseInt(params.page as string) || postStore.curPage
    const page = routePage > postStore.pages ? postStore.pages : routePage

    pushPage(page)
    curPage.value = page
  })

  return {
    curPage,
    pageSize,
  }
}
