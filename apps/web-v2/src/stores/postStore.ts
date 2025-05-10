import type { SearchQuery } from '@/composables/useSearch'
import type { ImportedData, Post } from '@weibo-archiver/core'
import { DEFAULT_PAGE_SIZE, idb, WeiboParser } from '@weibo-archiver/core'
import { destr } from 'destr'
import Fuse from 'fuse.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './userStore'

interface FuseObj {
  text: string
  id: string
  withText: boolean
  withImage: boolean
  withOriginal: boolean
  withRepost: boolean
  createdAt: Date
}

export const usePostStore = defineStore('post', () => {
  const importing = ref(true)
  const userStore = useUserStore()

  const fuse = ref<Fuse<FuseObj>>(new Fuse<FuseObj>([]))

  async function setupFuse() {
    const posts = await idb.getAllPosts()

    const docs = posts.map((post) => {
      const hasRetweet = !!post.retweet?.user?.name
      return {
        text: `${post.text}\n${hasRetweet && post.retweet?.text}`.trim(),
        id: post.id.toString(),
        withText: post.imgs.length === 0 && !hasRetweet,
        withImage: post.imgs.length > 0,
        withOriginal: !post.retweet?.mblogid,
        withRepost: !!post.retweet?.mblogid,
        createdAt: new Date(post.createdAt),
      }
    })

    const index = Fuse.createIndex(['text'], docs)

    fuse.value = new Fuse(docs, {
      keys: ['text'],
      // ignoreLocation: true,
      // shouldSort: false,
      includeScore: true,
      // useExtendedSearch: true,
    }, index)
  }

  async function parseAndImport(jsonStr: string): Promise<void> {
    importing.value = true
    const data = destr<ImportedData>(jsonStr, { strict: true })

    const { user, followings, weibo } = data

    await userStore.importUser(user)
    await idb.addFollowings(followings)
    await idb.addPosts(WeiboParser.migrateFromOld(weibo, user.uid))

    await setupFuse()

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
    const res = fuse.value
      .search(query.searchText)
      .filter(item => (item.score || 0) > 0.5)

    // console.log(res)

    const idArr = res.map(({ item }) => item)
      .sort((a, b) => b.id.localeCompare(a.id))
      .filter((item) => {
        let timeFilter = true
        if (query.dateFrom && query.dateTo) {
          timeFilter = query.dateTo.getTime() >= item.createdAt.getTime()
            && query.dateFrom.getTime() <= item.createdAt.getTime()
        }

        return timeFilter
      })
      .filter((item) => {
        // 包含图片
        if (query.withImage === false) {
          return item.withImage === false
        }
        return true
      })
      .filter((item) => {
        // 转发微博
        if (query.withRepost === false) {
          return item.withRepost === false
        }
        return true
      })
      .filter((item) => {
        // 包含原创
        if (query.withOriginal === false) {
          return item.withOriginal === false
        }
        return true
      })
      .filter((item) => {
        // 纯文字
        if (query.withText === false) {
          return item.withText === false
        }
        return true
      })
      .map(item => item.id)
    const pagedIdxArr = idArr.slice((curPage - 1) * pageSize, pageSize * curPage)

    const posts = await idb.getPostsByIds(pagedIdxArr)
    return {
      posts,
      total: idArr.length,
    }
  }

  return {
    importing,

    getPosts,
    getAllTotal,
    searchPosts,
    parseAndImport,
    setupFuse,
  }
})
