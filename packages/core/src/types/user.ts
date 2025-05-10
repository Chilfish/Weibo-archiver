import * as z from 'zod'

export type UID = string

export const userSchema = z.object({
  uid: z.string(),
  name: z.string(),
  avatar: z.string(),
  remark: z.string().optional(),
})

const userWithBioSchema = userSchema.extend({
  bio: z.string(),
})

const userInfoSchema = userWithBioSchema.extend({
  followers: z.number(),
  followings: z.number(),
  createdAt: z.string().optional(),
  birthday: z.string().optional(),
  postCount: z.number().optional(),
  exportedAt: z.string().optional(),
})

const followingsSchema = userSchema.extend({
  followBy: z.string(),
})

export type User = z.infer<typeof userSchema>
export type UserBio = z.infer<typeof userWithBioSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type Followings = z.infer<typeof followingsSchema>
