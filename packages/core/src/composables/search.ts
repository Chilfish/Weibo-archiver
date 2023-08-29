import type { Post } from '../types'

export async function useSearch(word: string): Promise<Post[]> {
  const { data } = await useFetch(`/search?q=${encodeURIComponent(word)}`).json<number[]>()
  const postStore = usePostStore()

  const results = data.value?.flatMap(id => postStore.getById(id)) ?? []
  postStore.resultPosts = results
  return results
}
