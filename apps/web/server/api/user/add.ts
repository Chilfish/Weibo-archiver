import { userDb } from '~~/server/utils/database'

export default defineEventHandler(async (_event) => {
  const user = await userDb.insertUser({ name: 'John Doe', email: 'doe@mail.com' })
  return user
})
