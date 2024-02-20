import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createAt: text('create_at').default(new Date().toISOString()),
})

export type User = typeof user.$inferInsert
