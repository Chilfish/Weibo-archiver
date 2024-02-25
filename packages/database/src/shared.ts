import type { PostTable, UserTable } from './schema'

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

export interface DBMethods {
  getAllUsers: () => Promise<UserTable[]>
  getUserById: (id: number) => Promise<UserTable | undefined>
  addUser: (newUser: UserTable) => Promise<UserTable>

  postCount: () => Promise<number>
  getPosts: (page: number, pageSize: number,) => Promise<PostTable[]>
  getAllPosts: () => Promise<PostTable[]>
  getPostById: (id: number) => Promise<PostTable | undefined>
  addPost: (newPost: PostTable) => Promise<PostTable>
  searchPost: (text: string) => Promise<PostTable[]>
}
