import type { User } from './schema/user'

export interface UserDBMethods {
  getAllUsers: () => Promise<User[]>
  insertUser: (newUser: User) => Promise<User>
}

export type DBMethods = UserDBMethods
