import { UserDB, createDatabase } from '@core/database'

const { dbPath } = useRuntimeConfig()

console.log('db dir', dbPath)

const db = createDatabase(dbPath)
export const userDb = new UserDB(db)
