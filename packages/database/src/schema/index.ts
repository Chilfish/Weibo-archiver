import { relations } from 'drizzle-orm'
import { userTable } from './user'
import { postTable } from './post'

// https://orm.drizzle.team/docs/rqb#include-relations

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable),
}))

export const postRelations = relations(postTable, ({ one }) => ({
  user: one(userTable, {
    fields: [postTable.uid],
    references: [userTable.id],
  }),
}))

export * from './post'
export * from './user'
