import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { Comment } from '../shared'
import { type UserTable, userTable } from './user'
import type { CardInfo } from '~/src/types'

export const postTable = sqliteTable('posts', {
  id: integer('id').notNull().primaryKey({ autoIncrement: true }),
  mid: text('mid').notNull().unique(),
  text: text('text').notNull(),
  imgs: text('imgs', { mode: 'json' }).$type<string[]>().notNull(),

  uid: integer('uid').notNull().references(() => userTable.id),

  repostCount: integer('repost_count').notNull(),
  commentCount: integer('comment_count').notNull(),
  likeCount: integer('like_count').notNull(),

  createdAt: text('created_at').notNull(),
  ip: text('ip').notNull(),
  postFrom: text('post_from').notNull(),

  repost: text('repost', { mode: 'json' }).$type<any>(),
  repostText: text('repost_text'), // for search
  card: text('card', { mode: 'json' }).$type<CardInfo>(),
  comments: text('comments', { mode: 'json' }).$type<any>(),
})

type _PostTable = Omit<typeof postTable.$inferInsert, 'repost' | 'comments'>

export type PostTableInsert = _PostTable & {
  comments: Comment[]
  repost: _PostTable
}

export type PostTable = Omit<PostTableInsert, 'uid'> & {
  user: UserTable
}
