import { type User, user } from '../schema/user'
import type { DB } from '../index'
import type { UserDBMethods } from '../shared'

export class UserDB implements UserDBMethods {
  constructor(readonly db: DB) {}

  async getAllUsers() {
    return await this.db.select().from(user)
  }

  async insertUser(newUser: User) {
    const res = await this.db.insert(user).values(newUser).returning()
    return res[0]
  }
}
