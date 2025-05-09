import type { SearchQuery } from '@/composables/useSearch'
import type { ImportedData, Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, IDB } from '@weibo-archiver/core'
import { destr } from 'destr'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './userStore'

export const usePostStore = defineStore('post', () => {
  const importing = ref(true)

  const userStore = useUserStore()

  const idb = new IDB()

  async function setup() {
    idb.setup(userStore.curUid)

    const posts = await idb.getAllDBPosts()
    idb.buildSearch(posts)

    console.log('setting up', userStore.curUid)
  }

  async function parseAndImport(jsonStr: string): Promise<void> {
    importing.value = true
    const data = destr<ImportedData>(jsonStr, { strict: true })

    const { user, followings, weibo } = data
    userStore.importUser(user)
    await setup()

    await idb.addFollowings(followings)
    await idb.addDBPosts(weibo)

    console.log(weibo.length, user, followings.length)
    importing.value = false
  }

  async function getPosts(
    curPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Post[]> {
    return await idb.getDBPosts(curPage, pageSize)
  }

  async function getAllTotal(): Promise<number> {
    return await idb.getCount()
  }

  async function searchPosts(query: SearchQuery): Promise<Post[]> {
    const timeIdxs = idb.fuse
      .search(query.searchText)
      .map(res => res.item.time)

    const pagedIdxs = timeIdxs.slice()

    const posts = await idb.getDBPostByTime(pagedIdxs)

    console.log(timeIdxs, posts)
    return posts
  }

  return {
    importing,

    setup,
    getPosts,
    getAllTotal,
    searchPosts,
    parseAndImport,
  }
})
