import { deleteDB, openDB } from 'idb'
import type { FuseResult } from 'fuse.js'
import Fuse from 'fuse.js'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { Post, UID } from '@types'

const DB_NAME = 'app'
const DB_VERSION = Number(localStorage.getItem('db_version')) || 2

type AppDB = DBSchema & {
  [Key in UID]: {
    key: number
    value: Post
    indexes: {
      time: number
    }
  }
}

export async function deleteOld() {
  const name = 'keyval-store'
  await deleteDB(name)
}

export class IDB {
  idb: Promise<IDBPDatabase<AppDB>>
  name: UID

  constructor(
    name: UID,
    version = DB_VERSION,
  ) {
    this.name = name
    this.idb = openDB<AppDB>(DB_NAME, version, {
      upgrade(db, oldVer, newVer) {
        console.log('upgrade', oldVer, newVer)

        if (db.objectStoreNames.contains(name))
          return

        const store = db.createObjectStore(name, { keyPath: 'id' })
        store.createIndex('time', 'created_at', { unique: true })
        localStorage.setItem('db_version', String(newVer))
      },
    })
  }

  async exists(name: UID) {
    const db = await this.idb
    return db.objectStoreNames.contains(name)
  }

  lastRange = IDBKeyRange.upperBound(Date.now())
  async getDBPosts(
    page = 1,
    limit = 10,
  ) {
    const db = await this.idb
    const posts: Post[] = []

    const ts = db.transaction(this.name)

    let cursor = await ts.store.index('time').openCursor(this.lastRange, 'prev')

    if (!cursor)
      return posts

    try {
      const target = (page - 1) * limit
      target && await cursor.advance(target)

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

  async getDBPost(times: number[]) {
    const db = await this.idb
    const posts: Post[] = []
    const ts = db.transaction(this.name)
    const index = ts.store.index('time')

    for (const time of times) {
      const post = await index.get(time)
      post && posts.push(post)
    }

    return posts
  }

  async getAllDBPosts() {
    const db = await this.idb
    return await db.getAll(this.name)
  }

  async getPostCount() {
    const db = await this.idb
    return await db.count(this.name)
  }

  /**
   * 批量覆盖添加或合并添加
   * @param posts
   * @param isReplace 默认为 true 覆盖添加
   */
  async addDBPosts(
    posts: Post[],
    isReplace = true,
  ) {
    const db = await this.idb

    if (isReplace)
      await db.clear(this.name)

    const ts = db.transaction(this.name, 'readwrite')
    const store = ts.store

    posts.forEach((post) => {
      post.created_at = new Date(post.created_at).getTime()
      store.put(post)
    })

    const count = await store.count()

    await ts.done

    const { search } = this.buildSearch(posts)

    return {
      count,
      search,
    }
  }

  async clearDB() {
    const db = await this.idb
    await db.clear(this.name)
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
          .replace(/[\s\n]+/g, ' ') // 移除多余的空白字符
          .replace(/@[\u4E00-\u9FA5a-zA-Z0-9_-]+/g, '') // 移除 @ 用户名
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
     */
      search: (text: string) => {
        const query = decodeURIComponent(text)
          .split(' ')
          .map(t => searchToken.some(s => t.startsWith(s)) ? t : `'${t}`)
          .join(' ')

        console.log(query)

        return fuse.search(query)
      },
    }
  }
}

export type SaerchResult = FuseResult<{
  time: number
  text: string
}>[]

export class EmptyIDB extends IDB {
  constructor() {
    super('uid-0')
  }

  async getDBPosts(_page = 1, _limit = 10) { return [] as Post[] }
  async getDBPost(_times: number[]) { return [] as Post[] }
  async getAllDBPosts() { return [] as Post[] }
  async getPostCount() { return 0 }
  async clearDB() { }
  async getSize() { return '0' }
  async addDBPosts(_posts: Post[], _isReplace = true,
  ) {
    return {
      count: 0,
      search: (_text: string) => [] as SaerchResult,
    }
  }

  buildSearch(_posts: Post[]) {
    return {
      search: (_text: string) => [] as SaerchResult,
    }
  }
}
