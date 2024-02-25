import { type BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import fs from 'fs-extra'

import { postTable, userTable } from './schema'

export * from './schema'
export * from './query'
export * from './shared'

export type DB = BetterSQLite3Database<{
  user: typeof userTable
  post: typeof postTable
}>

export function createDatabase(path: string) {
  try {
    if (!fs.existsSync(path))
      throw new Error(`Database file not found\n at: ${path}\nPlease check the path.`)

    const sqlite = new Database(path)
    const db = drizzle(sqlite, {
      schema: {
        user: userTable,
        post: postTable,
      },
    })

    return db
  }
  catch (e) {
    throw new Error(`Failed to create database ${e}`)
  }
}
