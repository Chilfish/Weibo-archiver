import type {
  Post,
  UID,
  UserBio,
  UserInfo,
} from '@shared'
import type { FuseResult } from 'fuse.js'
import type { DBSchema, IDBPDatabase } from 'idb'
import dayjs from 'dayjs'
import Fuse from 'fuse.js'
import { deleteDB, openDB } from 'idb'

const POST_STORE = 'posts'
const USER_STORE = 'user'
const FLOWERINGS_STORE = 'followings'
export const DB_VERSION = 4

type AppDB = DBSchema & {
  [POST_STORE]: {
    key: number
    value: Post
    indexes: {
      time: number
    }
  }
  [USER_STORE]: {
    key: string
    value: UserInfo
  }
  [FLOWERINGS_STORE]: {
    key: string
    value: UserBio
  }
}

export async function deleteOld() {
  const name = 'keyval-store'
  await deleteDB(name)
}

/**
 * 检测该用户的数据库是否存在
 */
export async function checkDB(uid: number) {
  const name = `uid-${uid}`

  const db = await openDB<AppDB>(name, DB_VERSION)
  const isExist = db.objectStoreNames.contains(POST_STORE)

  if (!isExist)
    await deleteDB(name)
  db.close()

  return isExist
}

export class IDB {
  idb: Promise<IDBPDatabase<AppDB>>
  name: UID
  posts: Post[] = []

  constructor(
    name: UID,
    version = DB_VERSION,
  ) {
    this.name = name
    this.idb = openDB<AppDB>(name, version, {
      upgrade(db, _oldVer) {
        if (!db.objectStoreNames.contains(POST_STORE)) {
          const store = db.createObjectStore(POST_STORE, { keyPath: 'id' })
          store.createIndex('time', 'created_at', { unique: true })
        }
        if (!db.objectStoreNames.contains(USER_STORE))
          db.createObjectStore(USER_STORE, { keyPath: 'uid' })

        if (!db.objectStoreNames.contains(FLOWERINGS_STORE))
          db.createObjectStore(FLOWERINGS_STORE, { keyPath: 'uid' })
      },
    })
  }

  exists(name: UID) {
    return this.name === name
  }

  async close() {
    return this.idb.then(db => db.close())
  }

  lastRange = IDBKeyRange.upperBound(Date.now())

  /**
   * 分页地获取帖子
   */
  async getDBPosts(
    page = 1,
    limit = 10,
  ) {
    const db = await this.idb
    const posts: Post[] = []

    const ts = db.transaction(POST_STORE)

    let cursor = await ts.store.index('time').openCursor(this.lastRange, 'prev')

    if (!cursor)
      return posts

    try {
      const target = (page - 1) * limit
      if (target)
        await cursor.advance(target)

      while (cursor && posts.length < limit) {
        posts.push(cursor.value)
        cursor = await cursor.continue()
      }
      ts.commit()
    }
    catch (e: any) {
      ts.abort()
      throw new Error(`Error getting posts: ${e.message}`)
    }
    return posts
  }

  /**
   * 从时间戳数组中获取帖子
   */
  async getDBPostByTime(times: number[]) {
    const db = await this.idb
    const posts: Post[] = []
    const ts = db.transaction(POST_STORE)
    const index = ts.store.index('time')

    for (const time of times) {
      const post = await index.get(time)
      if (post)
        posts.push(post)
    }

    return posts
  }

  /**
   * 获取所有帖子
   */
  async getAllDBPosts() {
    if (this.posts.length)
      return this.posts

    const db = await this.idb
    const posts = await db.getAll(POST_STORE)
    this.posts = posts
    return posts
  }

  async getDBPostById(id: string) {
    const posts = await this.getAllDBPosts()
    return posts.find(post => post.mblogid === id)
  }

  /**
   * 获取帖子总数
   */
  async getPostCount() {
    const db = await this.idb
    return await db.count(POST_STORE)
  }

  /**
   * 批量覆盖添加或合并添加
   * @param posts
   * @param isReplace 默认为 true 覆盖添加
   * @param buildSearch 默认为 true 构建搜索
   */
  async addDBPosts(
    posts: Post[],
    isReplace = true,
    buildSearch = true,
  ) {
    const db = await this.idb

    if (isReplace)
      await db.clear(POST_STORE)

    const ts = db.transaction(POST_STORE, 'readwrite')
    const store = ts.store

    posts.forEach((post) => {
      post.created_at = dayjs(post.created_at).valueOf()
      store.put(post)
    })

    const count = await store.count()

    await ts.done

    if (!buildSearch) {
      return {
        count,
        search: (_text: string) => [] as number[],
      }
    }

    const { search } = this.buildSearch(posts)

    return {
      count,
      search,
    }
  }

  async addDBPost(post: Post) {
    const db = await this.idb
    const ts = db.transaction(POST_STORE, 'readwrite')
    const store = ts.store

    post.created_at = dayjs(post.created_at).valueOf()
    await store.put(post)
  }

  /**
   * 清空数据库
   */
  async clearDB() {
    const db = await this.idb

    await Promise.all([
      db.clear(POST_STORE),
      db.clear(USER_STORE),
      db.clear(FLOWERINGS_STORE),
    ])
  }

  async clearFollowings() {
    const db = await this.idb
    await db.clear(FLOWERINGS_STORE)
  }

  /**
   * 获取 IndexedDB 存储空间大小
   * @returns 返回已使用的 IndexedDB 存储空间大小，单位 MB
   */
  async getSize() {
    const estimate = await navigator.storage.estimate()
    const used = estimate.usage || 0

    return (used / 1024 / 1024).toFixed(2)
  }

  /**
   * 构建 fuse 搜索实例
   * @param posts
   * @returns 搜索函数
   */
  buildSearch(
    posts: Post[],
  ) {
    const docs = posts.map((post) => {
      return {
        time: post.created_at as number,
        text: `${post.text} ${post.retweeted_status?.text}`
          .replace(/<[^>]+>/g, ' ') // 移除所有 HTML 标签
          .replace(/(undefined|查看图片|查看链接|转发微博)/, '')
          .replace(/&[a-z]+;/g, ' ') // 移除 HTML 实体字符
          .replace(/\s+/g, ' ') // 移除多余的空白字符
          .replace(/@[\u4E00-\u9FA5\w-]+/g, '') // 移除 @ 用户名
          .trim(),
      }
    })

    const index = Fuse.createIndex(['text'], docs)

    const fuse = new Fuse(docs, {
      keys: ['text'],
      ignoreLocation: true,
      // shouldSort: false,
      includeScore: true,
      useExtendedSearch: true,
    }, index)

    const searchToken = ['=', '!', '^', '\'']

    return {
    /**
     * TODO: 更多的搜索选项
     * 全文匹配搜索
     * @param text
     * @returns 返回匹配的时间戳数组
     */
      search: (text: string) => {
        const query = decodeURIComponent(text)
          .split(' ')
          .map(t => searchToken.some(s => t.startsWith(s)) ? t : `'${t}`)
          .join(' ')

        return fuse.search(query)
          .map(r => r.item.time)
          .sort((a, b) => b - a) // 新帖子在前
      },
    }
  }

  /**
   * 根据时间戳范围筛选帖子
   */
  async filterByTime(
    start: number,
    end: number,
    page: number,
    limit: number,
  ) {
    const db = await this.idb
    const posts: Post[] = []

    const ts = db.transaction(POST_STORE)

    // 闭区间
    const range = IDBKeyRange.bound(start, end)
    const index = ts.store.index('time')
    let cursor = await index.openCursor(range)

    const count = await index.count(range)

    if (!cursor)
      return { posts, count }

    try {
      const target = (page - 1) * limit
      if (target)
        await cursor.advance(target)

      while (cursor && posts.length < limit) {
        posts.push(cursor.value)
        cursor = await cursor.continue()
      }
      ts.commit()
    }
    catch (e: any) {
      ts.abort()
      throw new Error(`Error getting posts: ${e.message}`)
    }

    return {
      posts,
      count,
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const db = await this.idb
    return await db.getAll(USER_STORE).then(users => users[0])
  }

  /**
   * 设置用户信息
   */
  async setUserInfo(user: UserInfo) {
    const db = await this.idb
    await db.put(USER_STORE, user)
  }

  async addFollowings(followings: UserBio[]) {
    const db = await this.idb
    const ts = db.transaction(FLOWERINGS_STORE, 'readwrite')
    const store = ts.store

    followings.forEach((following) => {
      store.put(following)
    })

    await ts.done
  }

  async getFollowings() {
    const db = await this.idb
    return await db.getAll(FLOWERINGS_STORE)
  }

  async getImgs() {
    const result: Album[] = []
    const posts = await this.getAllDBPosts()

    posts
      .sort((a, b) => {
        return dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
      }) // 新帖子在前
      .forEach((post) => {
        post.imgs.forEach((img) => {
          result.push({
            img,
            date: new Date(post.created_at),
            id: post.mblogid,
          })
        })
      })

    return result
  }
}

interface Album {
  img: string
  id: string
  date: Date
}

export type SeachResult = FuseResult<{
  time: number
  text: string
}>[]

export class EmptyIDB extends IDB {
  constructor() {
    super('uid-0')
  }

  async getDBPosts(_page = 1, _limit = 10) { return [] as Post[] }
  async getDBPostByTime(_times: number[]) { return [] as Post[] }
  async getAllDBPosts() { return [] as Post[] }
  async getDBPostById(_id: string) { return {} as Post | undefined }
  async getPostCount() { return 0 }
  async clearDB() { }
  async getSize() { return '0' }
  async addDBPosts(_posts: Post[], _isReplace = true, _buildSearch = true) {
    return {
      count: 0,
      search: (_text: string) => [] as number[],
    }
  }

  buildSearch(_posts: Post[]) {
    return {
      search: (_text: string) => [] as number[],
    }
  }

  async getUserInfo(): Promise<UserInfo> { return {} as any }
  async setUserInfo(_user: UserInfo): Promise<void> {}
  async addFollowings(_followings: UserBio[]): Promise<void> {}
  async getFollowings(): Promise<UserBio[]> { return [] }
  async getImgs(): Promise<Album[]> { return [] }
}
