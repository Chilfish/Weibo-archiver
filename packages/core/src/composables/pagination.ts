import { useRoute, useRouter } from 'vue-router'

export function usePagination() {
  const postStore = usePostStore()
  const router = useRouter()
  const route = useRoute()

  const pageSize = ref(postStore.postsPerPage)
  const curPage = ref(postStore.curPage)

  watch([pageSize, curPage], ([newPageSize, newCurPage]) => {
    router.push({
      path: `/p/${newCurPage}`,
      query: {
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
