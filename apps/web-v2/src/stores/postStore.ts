import type { SearchQuery } from '@/composables/useSearch'
import type { ImportedData, Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, idb } from '@weibo-archiver/core'
import { destr } from 'destr'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './userStore'

export const usePostStore = defineStore('post', () => {
  const importing = ref(true)
  const userStore = useUserStore()

  async function parseAndImport(jsonStr: string): Promise<void> {
    importing.value = true
    const data = destr<ImportedData>(jsonStr, { strict: true })

    const { user, followings, weibo } = data

    await userStore.importUser(user)
    await idb.addFollowings(followings)
    await idb.addPosts(weibo)

    console.log(weibo.length, user, followings.length)
    importing.value = false
  }

  async function getPosts(
    curPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Post[]> {
    if (!idb.curUid) {
      return []
    }

    return await idb.getPosts(curPage, pageSize)
  }

  async function getAllTotal(): Promise<number> {
    return await idb.getAllPostsCount()
  }

  async function searchPosts(
    query: SearchQuery,
    curPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<{
      posts: Post[]
      total: number
    }> {
    return {
      posts: [],
      total: 0,
    }
  }

  return {
    importing,

    getPosts,
    getAllTotal,
    searchPosts,
    parseAndImport,
  }
})
