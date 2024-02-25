import { count, eq, like, or } from 'drizzle-orm'
import { postTable, userTable } from './schema'
import type { DB, DBMethods, PostTable, UserTable } from './index'

export class DBQuery implements DBMethods {
  constructor(readonly db: DB) {}

  async getAllUsers() {
    return await this.db.select().from(userTable)
  }

  async getUserById(id: number) {
    return await this.db.query.user.findFirst({ where: eq(userTable.id, id) })
  }

  async addUser(newUser: UserTable) {
    const res = await this.db.insert(userTable).values(newUser).returning()
    return res[0]
  }

  async getPosts(page: number, pageSize: number) {
    return await this.db.query.post.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
  }

  async postCount() {
    const data = await this.db.select({ value: count(postTable.id) }).from(postTable)
    return data[0].value
  }

  async getAllPosts() {
    return await this.db.query.post.findMany()
  }

  async getPostById(id: number) {
    return await this.db.query.post.findFirst({ where: eq(postTable.id, id) })
  }

  async addPost(newPost: PostTable) {
    const res = await this.db.insert(postTable).values(newPost).returning()
    return res[0]
  }

  async searchPost(text: string) {
    return await this.db.query.post.findMany({
      where: or(
        like(postTable.text, `%${text}%`),
        like(postTable.card, `%${text}%`),
        like(postTable.repostText, `%${text}%`),
      ),
    })
  }
}
