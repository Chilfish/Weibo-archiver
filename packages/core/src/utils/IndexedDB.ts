import type { Table } from 'dexie'
import type { Followings, Post, User, UserInfo } from '../types'
import Dexie from 'dexie'
import { DEFAULT_PAGE_SIZE } from '../constants'

export class IndexedDB extends Dexie {
  users!: Table<UserInfo, number>
  posts!: Table<Post, number>
  followings!: Table<Followings, number>
  curUser!: UserInfo

  constructor() {
    super('Weibo-archiver')

    this.version(1).stores({
      users: '++id, &uid, createdAt',
      posts: '++id, userId, createdAt',
      followings: '++id, followBy',
    })
  }

  get curUid() {
    return this.curUser?.uid || ''
  }

  async setCurUser(userId: string) {
    const data = await this.users
      .where('uid')
      .equals(userId)
      .toArray()

    this.curUser = data[0]
  }

  async addUser(user: UserInfo) {
    await this.users.put(user).catch('ConstraintError', async () => {
      const [key] = await this.users.where('uid').equals(user.uid).primaryKeys()
      await this.users.update(key, user)
    })
  }

  async addPosts(posts: Post[]) {
    await this.posts.bulkPut(posts)
  }

  async addFollowings(users: User[]) {
    const data: Followings[] = users.map((user) => {
      (user as Followings).followBy = this.curUid
      return user as Followings
    })
    await this.followings.bulkPut(data)
  }

  async getUsers(): Promise<UserInfo[]> {
    return this.users.toArray()
  }

  async getPosts(
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Post[]> {
    return this.posts
      .where('userId')
      .equals(this.curUser.uid)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .reverse()
      .toArray()
  }

  async getAllPostsCount(): Promise<number> {
    return this.posts.count()
  }
}

export const idb = new IndexedDB()
