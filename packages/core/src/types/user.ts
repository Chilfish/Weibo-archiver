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
  followingIds: z.array(z.string()),
  exportedAt: z.string().optional(),
})

const followingSchema = userSchema.extend({
  followers: z.number(),
  followings: z.number(),
  bio: z.string(),
  location: z.string(),
  createdAt: z.string(),
})

export type User = z.infer<typeof userSchema>
export type UserBio = z.infer<typeof userWithBioSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type Following = z.infer<typeof followingSchema>
