import { type DBSchema, deleteDB, openDB } from 'idb'
import Fuse from 'fuse.js'
import type { Post } from '@types'

const DB_NAME = 'app'
const DB_VERSION = 1
const STORE_NAME = 'posts'

interface AppDB extends DBSchema {
  [STORE_NAME]: {
    key: number
    value: Post
    indexes: {
      // text: string
      time: number
    }
  }
}

export async function deleteOld() {
  const name = 'keyval-store'
  await deleteDB(name)
}

export const idb = openDB<AppDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (db.objectStoreNames.contains(STORE_NAME))
      return

    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
    store.createIndex('time', 'created_at', { unique: true })
  },

  blocked() {
    console.log('blocked')
  },
})

const lastRange = IDBKeyRange.upperBound(Date.now())
export async function getDBPosts(
  page = 1,
  limit = 10,
) {
  const db = await idb
  const posts: Post[] = []

  const ts = db.transaction(STORE_NAME)

  let cursor = await ts.store.index('time').openCursor(lastRange, 'prev')

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

export async function getDBPost(times: number[]) {
  const db = await idb
  const posts: Post[] = []
  const ts = db.transaction(STORE_NAME)
  const index = ts.store.index('time')

  for (const time of times) {
    const post = await index.get(time)
    post && posts.push(post)
  }

  return posts
}

export async function getAllDBPosts() {
  const db = await idb
  return await db.getAll(STORE_NAME)
}

export async function getPostCount() {
  const db = await idb
  return await db.count(STORE_NAME)
}

/**
 * 批量覆盖添加或合并添加
 * @param posts
 * @param isReplace 默认为 true 覆盖添加
 */
export async function addDBPosts(
  posts: Post[],
  isReplace = true,
) {
  const db = await idb

  if (isReplace)
    await db.clear(STORE_NAME)

  const ts = db.transaction(STORE_NAME, 'readwrite')
  const store = ts.store

  posts.forEach((post) => {
    post.created_at = new Date(post.created_at).getTime()
    store.put(post)
  })

  const count = await store.count()

  await ts.done

  const { search } = buildSearch(posts)

  return {
    count,
    search,
  }
}

export async function clearDB() {
  const db = await idb
  await db.clear(STORE_NAME)
}

/**
 * 获取 IndexedDB 存储空间大小
 * @returns 返回已使用的 IndexedDB 存储空间大小，单位 MB
 */
export async function getSize() {
  const estimate = await navigator.storage.estimate()
  const used = estimate.usage || 0

  return (used / 1024 / 1024).toFixed(2)
}

interface FuseItem {
  time: number
  text: string
}

export function buildSearch(
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

  const fuse = new Fuse<FuseItem>(docs, {
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
