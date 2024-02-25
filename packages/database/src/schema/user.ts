import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  avatar: text('avatar').notNull(),
  followers: integer('followers').notNull(),
  following: integer('following').notNull(),
  bio: text('bio').notNull(),
  createAt: text('create_at'), // /profile/detail?uid=
})

export type UserTable = typeof userTable.$inferInsert
