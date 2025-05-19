import * as z from 'zod'

const zNumBoolean = z.enum(['0', '1'])

const rangeOptions = z.object({
  hasori: zNumBoolean.describe('是否包含原创').optional(),
  hasret: zNumBoolean.describe('是否包含转发').optional(),
  hastext: zNumBoolean.describe('是否包含文字').optional(),
  haspic: zNumBoolean.describe('是否包含图片').optional(),
  hasvideo: zNumBoolean.describe('是否包含视频').optional(),
  hasmuisc: zNumBoolean.describe('是否包含音乐').optional(),
})

const FetchArgsSchema = z.object({
  profile: z.object({
    uid: z.string(),
  }),
  profileDetail: z.object({
    uid: z.string(),
  }),
  userFollowings: z.object({
    uid: z.string(),
    page: z.number(),
  }),
  myFollowings: z.object({
    page: z.number(),
  }),
  searchUser: z.object({
    q: z.string(),
  }),
  postAll: z.object({
    uid: z.string(),
    page: z.number(),
    since_id: z.string().optional(),
    feature: z.number().default(0).optional(),
    ...rangeOptions.shape,
  }),
  postRange: z.object({
    uid: z.string(),
    page: z.number(),
    starttime: z.number(),
    endtime: z.number(),
    ...rangeOptions.shape,
  }),
  postLongText: z.object({
    id: z.string().describe('Post mblogid'),
  }),
  postComments: z.object({
    id: z.string().describe('Post Id'),
    uid: z.string(),
    is_show_bulletin: z.enum(['0', '2']),
    flow: zNumBoolean.describe('是否以热评排序'),
    is_reload: zNumBoolean.default('1').describe('获取详情页的评论'),
    is_mix: zNumBoolean.default('0'),
    count: z.number().default(20).describe('获取数量，20为上限。但似乎没有影响'),
    fetch_level: z.number().default(0),
    locale: z.enum(['zh_CN']),
  }),
  posts: z.object({
    isFetchAll: z.boolean().default(true).optional(),
    startAt: z.union([z.date(), z.string()]).optional(),
    endAt: z.union([z.date(), z.string()]).default('2000-01-01').optional(),
    sinceId: z.string().optional(),
    page: z.number().optional(),
    hasRepostPic: z.boolean().default(true).optional(),
    commentsCount: z.number().default(10),
    ...rangeOptions.shape,
  }),
  favorites: z.object({
    uid: z.string(),
    page: z.number(),
    with_total: z.boolean(),
  }),
})

export type FetchArgs = z.infer<typeof FetchArgsSchema>
