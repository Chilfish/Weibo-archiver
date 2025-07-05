import type { CalendarDate } from '@internationalized/date'
import type { Table } from 'dexie'
import type { Favorite, Following, Post, UserInfo } from '../types'
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

    this.version(1)
      .stores({
        users: 'uid, createdAt',
        posts: 'id, mblogid, userId, createdAt',
        followings: 'uid, followBy',
        favorites: 'id, mblogid, userId',
      })

    this.version(2)
      .stores({
        users: 'uid, createdAt',
        posts: 'id, mblogid, userId, createdAt',
        followings: 'uid',
        favorites: 'id, mblogid, favBy',
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

  async addFollowings(users: Following[]) {
    await this.followings.bulkPut(users)
  }

  async removeFollowings(users: Following[]): Promise<void> {
    const keys = await this.followings
      .filter(dbUser => users.some(user => user.uid === dbUser.uid))
      .primaryKeys()

    await this.followings.bulkDelete(keys)
  }

  async addFavorites(favorites: Favorite[]) {
    for (const favorite of favorites) {
      favorite.favBy = this.curUid
    }
    return this.favorites.bulkPut(favorites)
  }

  async getFollowings(): Promise<Following[]> {
    const curUserFollowingIds = this.curUser?.followingIds || []

    return this.followings
      .filter(user => curUserFollowingIds.includes(user.uid))
      .toArray()
  }

  /**
   * 油猴脚本端不存在多用户
   */
  async getAllFollowings(): Promise<Following[]> {
    return this.followings.toArray()
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

  async getLatestPost(): Promise<Post> {
    const post = await this.postQuery
      .limit(1)
      .toArray()

    return post[0]
  }

  async getAllPostsCount(): Promise<number> {
    return this.postQuery.count()
  }

  async getAllFollowingsCount(): Promise<number> {
    return this.followings.count()
  }

  async clearDB() {
    const postsCount = await this.postQuery.delete()
    const followingsCount = await this.followings.clear()
    const favoritesCount = await this.favoriteQuery.delete()
    const usersCount = await this.users.where('uid').equals(this.curUid).delete()

    return {
      postsCount,
      followingsCount,
      favoritesCount,
      usersCount,
    }
  }

  private get postQuery() {
    return this.posts
      .where('userId')
      .equals(this.curUid)
  }

  private get favoriteQuery() {
    return this.favorites
      .where('favBy')
      .equals(this.curUid)
  }
}

export const idb = new IndexedDB()
