import { userDb } from '~~/server/utils/database'

export default defineEventHandler(async (_event) => {
  const users = await userDb.getAllUsers()
  return users
})
