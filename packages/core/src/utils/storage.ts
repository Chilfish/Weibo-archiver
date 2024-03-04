import { type DBSchema, openDB } from 'idb'
import type { Post } from '@types'

const DB_NAME = 'app'
const DB_VERSION = 1
const STORE_NAME = 'posts'

interface AppDB extends DBSchema {
  [STORE_NAME]: {
    key: number
    value: Post
    indexes: {
      textIdx: string
    }
  }
}

export const idb = openDB<AppDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (db.objectStoreNames.contains(STORE_NAME))
      return

    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })

    store.createIndex('textIdx', 'text', { unique: false, multiEntry: true })
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

  const ts = db.transaction(STORE_NAME)
  let cursor = await ts.store.openCursor()

  if (!cursor)
    return []

  try {
    let count = 0
    while (cursor && count < (page - 1) * limit) {
      cursor = await cursor.continue()
      count++
    }

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

export async function getPostCount() {
  const db = await idb
  return await db.count(STORE_NAME)
}

/**
 * 批量覆盖添加或合并添加
 * @param posts
 * @param isReplace 默认为 true 覆盖添加
 */
export async function addPosts(
  posts: Post[],
  isReplace = true,
) {
  const db = await idb

  if (isReplace)
    await db.clear(STORE_NAME)

  const ts = db.transaction(STORE_NAME, 'readwrite')
  const store = ts.store

  for (const post of posts)
    await store.put(post)

  const count = await store.count()

  await ts.done
  return count
}
