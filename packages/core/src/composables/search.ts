import type { Post } from '../types'

// 也许应该用全文搜索库
export async function useSearch(p: string): Promise<Post[]> {
  const postStore = usePostStore()

  const res = postStore.posts.filter((post) => {
    const word = p.toLowerCase().trim().replace(/ /g, '')
    const regex = new RegExp(word, 'igm')
    return regex.test(post.text)
    || (post.card && regex.test(post.card?.title))
    || (post.retweeted_status && regex.test(post.retweeted_status?.text))
  })

  postStore.resultPosts = res
  return res
}
