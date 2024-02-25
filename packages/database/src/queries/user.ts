import { eq } from 'drizzle-orm'
import { type UserTable, userTable } from '../schema/user'
import type { DB } from '../index'
import type { UserDBMethods } from '../shared'

export class UserDB implements UserDBMethods {
  constructor(readonly db: DB) {}

  async getAllUsers() {
    return await this.db.query.user.findMany()
  }

  async getById(id: number) {
    return await this.db.query.user.findFirst({ where: eq(userTable.id, id) })
  }

  async insertUser(newUser: UserTable) {
    const res = await this.db.insert(userTable).values(newUser).returning()
    return res[0]
  }
}
