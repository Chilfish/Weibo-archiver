import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { CardInfo } from '@types'
import type { Comment } from '../shared'
import { userTable } from './user'

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

  repost: text('repost', { mode: 'json' }).notNull(),
  comments: text('comments', { mode: 'json' }).default('[]').notNull(),
  card: text('card', { mode: 'json' }).$type<CardInfo>(),
})

type _PostTable = Omit<typeof postTable.$inferInsert, 'repost' | 'comments'>

export type PostTable = _PostTable & {
  comment: Comment
  repost: _PostTable
}
