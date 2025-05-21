import * as z from 'zod'
import { userSchema } from './user'

const linkCardSchema = z.object({
  link: z.string(),
  title: z.string(),
  img: z.string(),
  desc: z.string().optional(),
})

const postMetaSchema = z.object({
  id: z.string(),
  regionName: z.string(),
  createdAt: z.string(),
  source: z.string().optional(),
})

const commentSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
  regionName: z.string(),
  likesCount: z.number(),
  commentsCount: z.number(),
  floor: z.number(),
  user: userSchema,
  img: z.string().optional(),
})

const _postSchema = postMetaSchema.extend({
  mblogid: z.string(),
  text: z.string(),
  imgs: z.array(z.string()),

  repostsCount: z.number(),
  commentsCount: z.number(),
  likesCount: z.number(),
})

const retweetSchema = _postSchema.extend({
  user: userSchema.optional(),
})

const postSchema = _postSchema.extend({
  userId: z.string(),
  card: linkCardSchema.optional(),
  comments: z.array(commentSchema),
  retweet: retweetSchema.optional(),
  isShowBulletIn: z.enum(['0', '2']),
})

export type LinkCard = z.infer<typeof linkCardSchema>
export type PostMeta = z.infer<typeof postMetaSchema>
export type Post = z.infer<typeof postSchema>
export type Retweet = z.infer<typeof retweetSchema>
export type Comment = z.infer<typeof commentSchema>
export type Favorite = Post
