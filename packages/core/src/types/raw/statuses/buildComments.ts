import * as z from 'zod'
import { UrlStructSchema } from './mymblog'

const BloggerIconActionlogSchema = z.object({
  act_code: z.string(),
  ext: z.string(),
})
type BloggerIconActionlog = z.infer<typeof BloggerIconActionlogSchema>

const CommentBubbleSchema = z.object({
  id: z.string(),
  icon_url: z.string(),
  start_color: z.string(),
  end_color: z.string(),
  start_color_dark: z.string(),
  end_color_dark: z.string(),
  name: z.string(),
  obtain_type: z.number(),
})
type CommentBubble = z.infer<typeof CommentBubbleSchema>

const TranslateActionlogSchema = z.object({
  act_code: z.number(),
  fid: z.null(),
  uicode: z.null(),
  ext: z.string(),
})
type TranslateActionlog = z.infer<typeof TranslateActionlogSchema>

const UrlStructActionlogSchema = z.object({
  act_type: z.number(),
  act_code: z.number(),
  oid: z.string(),
  uuid: z.number(),
  cardid: z.string(),
  lcardid: z.string(),
  uicode: z.string(),
  luicode: z.string(),
  fid: z.string(),
  lfid: z.string(),
  ext: z.string(),
})
type UrlStructActionlog = z.infer<typeof UrlStructActionlogSchema>

const BmiddleSchema = z.object({
  type: z.null(),
  url: z.string(),
  cut_type: z.number(),
  width: z.number(),
  height: z.number(),
  croped: z.boolean(),
})
type Bmiddle = z.infer<typeof BmiddleSchema>

const LargeSchema = z.object({
  type: z.null(),
  url: z.string(),
  cut_type: z.number(),
  width: z.string(),
  height: z.string(),
  croped: z.boolean(),
})
type Large = z.infer<typeof LargeSchema>

const FansIconSchema = z.object({
  uid: z.number(),
  isAuthor: z.boolean().optional(),
  scheme: z.string().optional(),
  fans_uid: z.number().optional(),
  val: z.number().optional(),
  member_rank: z.number().optional(),
  svip: z.number().optional(),
  vvip: z.number().optional(),
  lighting: z.boolean().optional(),
  icon_url: z.string().optional(),
  name: z.string().optional(),
})
type FansIcon = z.infer<typeof FansIconSchema>

const DataSchema = z.object({
  mbrank: z.number().optional(),
  mbtype: z.number().optional(),
  svip: z.number().optional(),
  vvip: z.number().optional(),
  value: z.string().optional(),
  icon_img: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
})
type Data = z.infer<typeof DataSchema>

const StatusTotalCounterSchema = z.object({
  total_cnt_format: z.union([z.number(), z.string()]),
  comment_cnt: z.string(),
  repost_cnt: z.string(),
  like_cnt: z.string(),
  total_cnt: z.string(),
})
type StatusTotalCounter = z.infer<typeof StatusTotalCounterSchema>

const FilterGroupSchema = z.object({
  param: z.string(),
  scheme: z.string(),
  title: z.string(),
  isDefault: z.number(),
})
type FilterGroup = z.infer<typeof FilterGroupSchema>

const BloggerIconSchema = z.object({
  name: z.string(),
  length: z.string(),
  actionlog: BloggerIconActionlogSchema,
  url: z.string(),
})
type BloggerIcon = z.infer<typeof BloggerIconSchema>

const TranslateSchema = z.object({
  hint_show: z.string(),
  hint_hide: z.string(),
  actionlog: TranslateActionlogSchema,
})
type Translate = z.infer<typeof TranslateSchema>

const B9128E35Ly1I0Wvg16Ws4J20Ek0OzgvkSchema = z.object({
  thumbnail: BmiddleSchema,
  bmiddle: BmiddleSchema,
  large: LargeSchema,
  woriginal: LargeSchema,
})
type B9128E35Ly1I0Wvg16Ws4J20Ek0Ozgvk = z.infer<typeof B9128E35Ly1I0Wvg16Ws4J20Ek0OzgvkSchema>

const IconListSchema = z.object({
  type: z.string(),
  data: DataSchema,
})
type IconList = z.infer<typeof IconListSchema>

const PicInfosSchema = z.object({
  b9128e35ly1i0wvg16ws4j20ek0ozgvk: B9128E35Ly1I0Wvg16Ws4J20Ek0OzgvkSchema,
})
type PicInfos = z.infer<typeof PicInfosSchema>

const UserSchema = z.object({
  id: z.number(),
  idstr: z.string(),
  pc_new: z.number(),
  screen_name: z.string(),
  profile_image_url: z.string(),
  profile_url: z.string(),
  verified: z.boolean(),
  verified_type: z.number(),
  domain: z.string(),
  weihao: z.string(),
  verified_type_ext: z.number().optional(),
  status_total_counter: StatusTotalCounterSchema,
  avatar_large: z.string(),
  avatar_hd: z.string(),
  follow_me: z.boolean(),
  following: z.boolean(),
  mbrank: z.number(),
  mbtype: z.number(),
  v_plus: z.number(),
  user_ability: z.number(),
  fansIcon: FansIconSchema,
  planet_video: z.boolean(),
  verified_reason: z.string().optional(),
  description: z.string(),
  location: z.string(),
  gender: z.string(),
  followers_count: z.number(),
  followers_count_str: z.string(),
  friends_count: z.number(),
  statuses_count: z.number(),
  url: z.string(),
  svip: z.number(),
  vvip: z.number(),
  cover_image_phone: z.string(),
  icon_list: z.array(IconListSchema),
})
type User = z.infer<typeof UserSchema>

const RawCommentSchema = z.object({
  created_at: z.string(),
  id: z.number(),
  rootid: z.number(),
  rootidstr: z.string(),
  floor_number: z.number(),
  text: z.string(),
  disable_reply: z.number(),
  is_mblog_author: z.boolean().optional(),
  restrictOperate: z.number(),
  source_allowclick: z.number(),
  source_type: z.number(),
  source: z.string(),
  user: UserSchema,
  mid: z.string(),
  idstr: z.string(),
  liked: z.boolean(),
  yellow_pic: z.number().optional(),
  readtimetype: z.string(),
  analysis_extra: z.string(),
  safe_tags: z.number().optional(),
  match_ai_play_picture: z.boolean(),
  translate: TranslateSchema,
  rid: z.string(),
  allow_follow: z.boolean(),
  item_category: z.string(),
  degrade_type: z.string(),
  report_scheme: z.string(),
  from_repost_type: z.number().optional(),
  comments: z.array(z.any()),
  max_id: z.number(),
  total_number: z.number(),
  isLikedByMblogAuthor: z.boolean(),
  url_struct: z.array(UrlStructSchema).optional(),
  blogger_icons: z.array(BloggerIconSchema).optional(),
  like_counts: z.number(),
  text_raw: z.string(),
  isExpand: z.boolean(),
  url_objects: z.array(z.any()).optional(),
  comment_bubble: CommentBubbleSchema.optional(),
})

export type RawComment = z.infer<typeof RawCommentSchema>

const RawCommentsSchema = z.object({
  ok: z.number(),
  filter_group: z.array(FilterGroupSchema),
  data: z.array(RawCommentSchema),
  rootComment: z.array(z.any()),
  total_number: z.number(),
  max_id: z.number(),
  trendsText: z.string(),
})
export type RawComments = z.infer<typeof RawCommentsSchema>
