import { type DBSchema, deleteDB, openDB } from 'idb'
import type { Post } from '@types'

const DB_NAME = 'app'
const DB_VERSION = 1
const STORE_NAME = 'posts'

interface AppDB extends DBSchema {
  [STORE_NAME]: {
    key: number
    value: Post
    indexes: {
      text: string
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

    store.createIndex('text', 'text', { unique: false, multiEntry: true })
    store.createIndex('time', 'created_at', { unique: true })
  },

  blocked() {
    console.log('blocked')
  },
})

export async function getDBPosts(
  page = 1,
  limit = 10,
) {
  const db = await idb
  const posts: Post[] = []

  const lastRange = IDBKeyRange.upperBound(Date.now())
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

export async function searchPost(
  query: string,
  page = 1,
  limit = 10,
) {
  const db = await idb
  const posts: Post[] = []

  const range = IDBKeyRange.bound(query, `${query}\uFFFF`)
  const count = await db.countFromIndex(STORE_NAME, 'text', range)

  const ts = db.transaction(STORE_NAME)
  const index = ts.store.index('text')
  let cursor = await index.openCursor(range)

  if (!cursor)
    return { posts, count }

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
    throw new Error(`Error searching posts: ${e.message}`)
  }

  return {
    posts,
    count,
  }
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
  return count
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
