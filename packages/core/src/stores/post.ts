import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Post } from '@types'
import { getMany, set as setDB, setMany } from 'idb-keyval'

export const usePostStore = defineStore('post', () => {
  console.log('post pinia store created')

  const ids = ref([] as string[])
  const posts = shallowRef([] as Post[])

  const route = useRoute()

  const viewImg = ref(imgViewSrc)

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10) // 每页显示的帖子数量 ppp

  // 总帖子数
  const total = ref(ids.value.length)

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  function reset() {
    viewImg.value = imgViewSrc
    curPage.value = 1
    pageSize.value = 20
  }

  /**
   * 设置帖子数据，可选择是否替换或是追加合并
   * @param data
   * @param replace
   */
  async function set(
    data: Post[],
    replace = false,
  ) {
    if (!data[0]?.user)
      throw new Error('数据格式错误，可能要重新导入')

    let after = data
    const _posts = toValue(posts)

    if (!replace) {
      after = [..._posts, ...data].filter((post, index, self) => {
        return index === self.findIndex(t => t.id === post.id)
      })
    }

    const _ids = after.map(post => `post-${post.id}`)

    await setDB('ids', _ids)
    await setMany(after.map(post => [`post-${post.id}`, post]))
    ids.value = _ids
    total.value = after.length
    posts.value = after
  }

  async function get(page?: number) {
    if (ids.value.length === 0)
      return []

    let p = page
    if (!p)
      p = curPage.value
    const sliceDis = [(p - 1) * pageSize.value, p * pageSize.value]

    const path = route.path
    const query = route.query.q as string

    if (posts.value.length === 0) {
      posts.value = (
        await getMany<Post>(ids.value)
          .then(res =>
            res.filter(Boolean).sort((a, b) => b.id - a.id),
          )
      )
    }

    if (path === '/post') {
      total.value = ids.value.length
      return posts.value.slice(...sliceDis)
    }
    else {
      const data = await searchText(query)
      total.value = data.length
      return data.slice(...sliceDis)
    }
  }

  // TODO: 优化
  async function searchText(p: string): Promise<Post[]> {
    const res = posts.value.filter((post) => {
      const word = p.toLowerCase().trim().replace(/ /g, '')
      const regex = new RegExp(word, 'igm')
      return regex.test(post.text)
        || (post.card && regex.test(post.card?.title))
        || (post.retweeted_status && regex.test(post.retweeted_status?.text))
    })

    return res
  }

  return {
    ids,
    viewImg,
    total,
    pages,
    pageSize,
    curPage,

    get,
    set,
    reset,

    searchText,
  }
})
