import { type UserTable, userTable } from '../schema/user'
import type { DB } from '../index'
import type { UserDBMethods } from '../shared'

export class UserDB implements UserDBMethods {
  constructor(readonly db: DB) {}

  async getAllUsers() {
    return await this.db.select().from(userTable)
  }

  async insertUser(newUser: UserTable) {
    const res = await this.db.insert(userTable).values(newUser).returning()
    return res[0]
  }
}
