import type {
  CalendarDate,
} from '@internationalized/date'
import type { Table } from 'dexie'
import type { Following, Post, User, UserInfo } from '../types'
import { parseAbsolute, today } from '@internationalized/date'
import Dexie from 'dexie'
import { DEFAULT_PAGE_SIZE } from '../constants'

export class IndexedDB extends Dexie {
  users!: Table<UserInfo, number>
  posts!: Table<Post, number>
  followings!: Table<Following, number>
  curUser!: UserInfo

  constructor() {
    super('Weibo-archiver')

    this.version(1).stores({
      users: '++pid, &uid, createdAt',
      posts: '++pid, userId, createdAt',
      followings: '++pid, &[uid+followBy], followBy',
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
    const data: Following[] = users.map((user) => {
      (user as Following).followBy = this.curUid
      return user as Following
    })
    await this.followings.bulkPut(data)
  }

  async getFollowings(): Promise<Following[]> {
    return this.followings
      .where('followBy')
      .equals(this.curUid)
      .toArray()
  }

  async getUsers(): Promise<UserInfo[]> {
    return this.users.toArray()
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postQuery.toArray()
  }

  async getPosts(
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Post[]> {
    return this.postQuery
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .reverse()
      .toArray()
  }

  async getPostsByIds(idArr: string[]): Promise<Post[]> {
    return this.postQuery
      .and(post => idArr.includes(post.id.toString()))
      .reverse()
      .sortBy('id')
  }

  async getPostById(id: string): Promise<Post | undefined> {
    const post = await this.postQuery
      .and(post => post.mblogid === id)
      .toArray()

    return post.length > 0 ? post[0] : undefined
  }

  async getPostsByDay(day: CalendarDate = today('Asia/Shanghai')): Promise<Post[]> {
    const monthDay = `${day.month}-${day.day}`
    return this.postQuery
      .and((post) => {
        const date = parseAbsolute(new Date(post.createdAt).toISOString(), 'Asia/Shanghai')

        const postMonthDay = `${date.month}-${date.day}`
        return monthDay === postMonthDay
      })
      .reverse()
      .toArray()
  }

  async getAllPostsCount(): Promise<number> {
    return this.posts.count()
  }

  private get postQuery() {
    return this.posts
      .where('userId')
      .equals(this.curUser.uid)
  }
}

export const idb = new IndexedDB()
