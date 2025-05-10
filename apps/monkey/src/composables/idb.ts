import type { Post, UID, UserBio, UserInfo } from '@weibo-archiver/core'
import type { DBSchema, IDBPDatabase } from 'idb'
import { openDB } from 'idb'

const POST_STORE = 'posts'
const USER_STORE = 'user'
const FLOWERINGS_STORE = 'followings'
export const DB_VERSION = 4

type AppDB = DBSchema & {
  [POST_STORE]: {
    key: number
    value: Post
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

export class IDB {
  idb: Promise<IDBPDatabase<AppDB>> = openDB('0')
  name: UID = '0'
  posts: Post[] = []

  setup(
    name: UID,
    version = DB_VERSION,
  ) {
    this.name = name
    this.idb = openDB<AppDB>(name, version, {
      upgrade(db, _oldVer) {
        db.createObjectStore(POST_STORE, { keyPath: 'id' })
        db.createObjectStore(USER_STORE, { keyPath: 'uid' })
        db.createObjectStore(FLOWERINGS_STORE, { keyPath: 'uid' })
      },
    })
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

  /**
   * 获取帖子总数
   */
  async getPostCount() {
    const db = await this.idb
    return await db.count(POST_STORE)
  }

  async addDBPost(post: Post) {
    const db = await this.idb
    const ts = db.transaction(POST_STORE, 'readwrite')
    const store = ts.store
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
}
