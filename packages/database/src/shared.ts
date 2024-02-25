import type { UserTable } from './schema/user'

export interface Comment {
  id: number
  rootId: number
  user: {
    id: number
    name: string
    avatar: string
  }
  text: string
  likeCount: number
  commentCount: number
  ip: string
  createAt: string
  img?: string
}

export interface UserDBMethods {
  getAllUsers: () => Promise<UserTable[]>
  insertUser: (newUser: UserTable) => Promise<UserTable>
}

export type DBMethods = UserDBMethods
