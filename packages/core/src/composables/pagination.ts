import { useRoute, useRouter } from 'vue-router'

export function usePagination() {
  const postStore = usePostStore()
  const router = useRouter()
  const route = useRoute()
  const path = ref(route.path.replace(/\/\d+$/, '') || '/p')
  const query = ref(route.query)

  const pageSize = ref(postStore.postsPerPage)
  const curPage = ref(postStore.curPage)

  watch([pageSize, curPage], ([newPageSize, newCurPage]) => {
    router.push({
      path: `${path.value}/${newCurPage}`,
      query: {
        ...query.value,
        pageSize: newPageSize,
      },
    })

    postStore.postsPerPage = newPageSize
    postStore.curPage = newCurPage
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

    postStore.curPage = page
    curPage.value = page
  })

  return {
    curPage,
    pageSize,
  }
}
