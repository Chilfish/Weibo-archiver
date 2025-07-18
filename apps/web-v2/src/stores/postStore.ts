import type { Favorite, ImportedData, Post } from '@weibo-archiver/core'
import type { SearchQuery } from '@/composables/useSearch'
import {
  DEFAULT_PAGE_SIZE,
  exportData,
  idb,
  readFile,
  WeiboParser,
} from '@weibo-archiver/core'
import { destr } from 'destr'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { weiboSearchService } from '@/lib/search.service'
import { useUserStore } from './userStore'

export const usePostStore = defineStore('post', () => {
  const importing = ref(true)
  const userStore = useUserStore()
  const router = useRouter()

  async function setupFuse() {
    await weiboSearchService.init(idb.getAllPosts.bind(idb))
  }

  async function parseImport(e: Event): Promise<ImportedData> {
    const jsonStr = await readFile(e)
    return destr<ImportedData>(jsonStr, { strict: true })
  }

  async function saveImportedData(data: ImportedData): Promise<void> {
    importing.value = true
    const { user, followings, weibo, favorites } = data

    const followingIds = followings.map(data => data.uid)
    if (followingIds.length > 0) {
      user.followingIds = followingIds
    }

    await userStore.importUser(user)
    await idb.addFollowings(followings)
    await idb.addPosts(WeiboParser.migrateFromOld(weibo, user.uid))
    await idb.addFavorites(favorites)

    await setupFuse()

    console.log(weibo.length, user, followings.length)
    importing.value = false
    await router.push({
      path: '/post',
    })
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

  async function getAllPostsTotal(): Promise<number> {
    return idb.getAllPostsCount()
  }

  async function getAllFavoritesTotal(): Promise<number> {
    return idb.getAllFavoritesCount()
  }

  async function getFavorites(
    curPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Favorite[]> {
    return await idb.getFavorites(curPage, pageSize)
  }

  async function searchPosts(
    query: SearchQuery,
    curPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<{
    posts: Post[]
    total: number
  }> {
    // 如果有搜索文本，先进行全文搜索获取候选ID
    let candidateIds: string[] | null = null
    if (query.searchText) {
      candidateIds = await weiboSearchService.search(query.searchText)
    }

    const { posts, total } = await idb.searchPostsWithFilter({
      candidateIds,
      dateFrom: query.dateFrom,
      dateTo: query.dateTo,
      withImage: query.withImage,
      withRepost: query.withRepost,
      withOriginal: query.withOriginal,
      withText: query.withText,
      page: curPage,
      pageSize,
    })

    return {
      posts,
      total,
    }
  }

  async function getPostById(id: string): Promise<Post | undefined> {
    return idb.getPostById(id)
  }

  async function getTodayInLastYears(): Promise<Post[]> {
    return idb.getPostsByDay()
  }

  async function clearDB() {
    return idb.clearDB()
  }

  async function exportAllData(): Promise<void> {
    const weibo = await idb.getAllPosts()
    const followings = await idb.getFollowings()
    const favorites = await idb.getAllFavorites()

    await exportData({
      weibo,
      favorites,
      followings,
      user: idb.curUser,
    })
  }

  async function saveWeibo(posts: Post[]) {
    return idb.addPosts(posts)
  }
  async function saveFavorites(posts: Favorite[]) {
    return idb.addFavorites(posts)
  }

  return {
    importing,

    getPosts,
    getAllPostsTotal,
    getPostById,
    getFavorites,
    getAllFavoritesTotal,
    searchPosts,
    saveImportedData,
    parseImport,
    getTodayInLastYears,
    setupFuse,
    clearDB,
    exportAllData,
    saveWeibo,
    saveFavorites,
  }
})
