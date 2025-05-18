import type {
  CalendarDate,
} from '@internationalized/date'
import type { Table } from 'dexie'
import type { Favorite, Following, Post, User, UserInfo } from '../types'
import { parseAbsolute, today } from '@internationalized/date'
import Dexie from 'dexie'
import { DEFAULT_PAGE_SIZE } from '../constants'

export class IndexedDB extends Dexie {
  users!: Table<UserInfo, number>
  posts!: Table<Post, number>
  followings!: Table<Following, number>
  favorites!: Table<Favorite, number>

  curUser!: UserInfo

  constructor() {
    super('Weibo-archiver')

    this.version(1).stores({
      users: 'uid, createdAt',
      posts: 'id, mblogid, userId, createdAt',
      followings: 'uid, followBy',
      favorites: 'id, mblogid, userId',
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
    await this.users.put(user)
  }

  async addPosts(posts: Post[]) {
    return this.posts.bulkPut(posts)
  }

  async addFollowings(users: User[]) {
    const data: Following[] = users.map((user) => {
      if (this.curUid) {
        (user as Following).followBy = this.curUid
      }
      return user as Following
    })
    await this.followings.bulkPut(data)
  }

  async addFavorites(favorites: Favorite[]) {
    return this.favorites.bulkPut(favorites)
  }

  async getFollowings(): Promise<Following[]> {
    return this.followingQuery
      .toArray()
  }

  async getAllFavorites(): Promise<Favorite[]> {
    return this.favoriteQuery
      .toArray()
  }

  async getFavorites(
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<Favorite[]> {
    return this.favoriteQuery
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .reverse()
      .toArray()
  }

  async getAllFavoritesCount(): Promise<number> {
    return this.favoriteQuery
      .count()
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
    return this.postQuery.count()
  }

  async getAllFollowingsCount(): Promise<number> {
    return this.followingQuery
      .count()
  }

  async clearDB(): Promise<void> {
    await Promise.all([
      this.followingQuery.delete,
      this.postQuery.delete,
      this.favoriteQuery.delete,
    ])
  }

  private get postQuery() {
    return this.posts
      .where('userId')
      .equals(this.curUser.uid)
  }

  private get favoriteQuery() {
    return this.favorites
      .where('userId')
      .equals(this.curUid)
  }

  private get followingQuery() {
    return this.followings
      .where('followBy')
      .equals(this.curUid)
  }
}

export const idb = new IndexedDB()
