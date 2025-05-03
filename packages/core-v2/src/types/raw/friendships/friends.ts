import * as z from 'zod'

const GenderSchema = z.enum([
  'f',
  'm',
])
type Gender = z.infer<typeof GenderSchema>

const LangSchema = z.enum([
  'zh-cn',
  'zh-hk',
])
type Lang = z.infer<typeof LangSchema>

const InsecuritySchema = z.object({
  sexual_content: z.boolean(),
})
type Insecurity = z.infer<typeof InsecuritySchema>

const MbLikePrivilegeSchema = z.object({
  like_id: z.string(),
  like_desc: z.string(),
})
type MbLikePrivilege = z.infer<typeof MbLikePrivilegeSchema>

const StatusTotalCounterSchema = z.object({
  total_cnt: z.number(),
  repost_cnt: z.number(),
  comment_cnt: z.number(),
  like_cnt: z.number(),
  comment_like_cnt: z.number(),
})
type StatusTotalCounter = z.infer<typeof StatusTotalCounterSchema>

const The128Schema = z.object({
  education: z.array(z.string()),
  topic: z.array(z.string()),
})
type The128 = z.infer<typeof The128Schema>

const DatumSchema = z.object({
  key: z.number(),
  sub_key: z.number().optional(),
  weight: z.number(),
  desc: z.string(),
  timestamp: z.number().optional(),
})
type Datum = z.infer<typeof DatumSchema>

const VideoCoverSchema = z.object({
  mid: z.number(),
})
type VideoCover = z.infer<typeof VideoCoverSchema>

const VideoTotalCounterSchema = z.object({
  play_cnt: z.number(),
})
type VideoTotalCounter = z.infer<typeof VideoTotalCounterSchema>

const SvipVerifiedDetailSchema = z.object({
  128: The128Schema,
})
type SvipVerifiedDetail = z.infer<typeof SvipVerifiedDetailSchema>

const VerifiedDetailSchema = z.object({
  custom: z.number(),
  data: z.array(DatumSchema),
})
type VerifiedDetail = z.infer<typeof VerifiedDetailSchema>

const UserSchema = z.object({
  id: z.number(),
  idstr: z.string(),
  class: z.number(),
  screen_name: z.string(),
  name: z.string(),
  province: z.string(),
  city: z.string(),
  location: z.string(),
  description: z.string(),
  url: z.string(),
  profile_image_url: z.string(),
  light_ring: z.boolean(),
  cover_image: z.string().optional(),
  cover_image_phone: z.string().optional(),
  profile_url: z.string(),
  domain: z.string(),
  weihao: z.string(),
  gender: GenderSchema,
  followers_count: z.number(),
  followers_count_str: z.string(),
  friends_count: z.number(),
  pagefriends_count: z.number(),
  statuses_count: z.number(),
  video_status_count: z.number(),
  video_play_count: z.number(),
  super_topic_not_syn_count: z.number(),
  favourites_count: z.number(),
  created_at: z.string(),
  following: z.boolean(),
  allow_all_act_msg: z.boolean(),
  geo_enabled: z.boolean(),
  verified: z.boolean(),
  verified_type: z.number(),
  remark: z.string(),
  insecurity: InsecuritySchema,
  status_id: z.number(),
  status_idstr: z.string(),
  ptype: z.number(),
  allow_all_comment: z.boolean(),
  avatar_large: z.string(),
  avatar_hd: z.string(),
  verified_reason: z.string(),
  verified_trade: z.string(),
  verified_reason_url: z.string(),
  verified_source: z.string(),
  verified_source_url: z.string(),
  verified_state: z.number().optional(),
  verified_level: z.number().optional(),
  verified_type_ext: z.number().optional(),
  has_service_tel: z.boolean().optional(),
  verified_reason_modified: z.string().optional(),
  verified_contact_name: z.string().optional(),
  verified_contact_email: z.string().optional(),
  verified_contact_mobile: z.string().optional(),
  follow_me: z.boolean(),
  like: z.boolean(),
  like_me: z.boolean(),
  online_status: z.number(),
  bi_followers_count: z.number(),
  lang: LangSchema,
  star: z.number(),
  mbtype: z.number(),
  mbrank: z.number(),
  svip: z.number(),
  vvip: z.number(),
  mb_expire_time: z.number(),
  block_word: z.number(),
  block_app: z.number(),
  chaohua_ability: z.number(),
  brand_ability: z.number(),
  nft_ability: z.number(),
  vplus_ability: z.number(),
  wenda_ability: z.number(),
  live_ability: z.number(),
  gongyi_ability: z.number(),
  paycolumn_ability: z.number(),
  newbrand_ability: z.number(),
  ecommerce_ability: z.number(),
  hardfan_ability: z.number(),
  wbcolumn_ability: z.number(),
  interaction_user: z.number(),
  audio_ability: z.number(),
  place_ability: z.number(),
  credit_score: z.number(),
  user_ability: z.number(),
  cardid: z.string().optional(),
  avatargj_id: z.string().optional(),
  urank: z.number(),
  story_read_state: z.number(),
  verified_detail: VerifiedDetailSchema.optional(),
  svip_verified_detail: SvipVerifiedDetailSchema.optional(),
  vclub_member: z.number(),
  is_teenager: z.number(),
  is_guardian: z.number(),
  is_teenager_list: z.number(),
  pc_new: z.number(),
  special_follow: z.boolean(),
  planet_video: z.number(),
  video_mark: z.number(),
  live_status: z.number(),
  user_ability_extend: z.number(),
  status_total_counter: StatusTotalCounterSchema.optional(),
  video_total_counter: VideoTotalCounterSchema.optional(),
  brand_account: z.number(),
  hongbaofei: z.number(),
  green_mode: z.number(),
  urisk: z.number(),
  unfollowing_recom_switch: z.number(),
  block: z.number(),
  block_me: z.number(),
  avatar_type: z.number(),
  is_big: z.number(),
  auth_status: z.number(),
  auth_realname: z.null(),
  auth_career: z.null(),
  auth_career_name: z.null(),
  show_auth: z.number(),
  is_auth: z.number(),
  is_punish: z.number(),
  avatar_hd_pid: z.string(),
  like_display: z.number(),
  comment_display: z.number(),
  mb_like_privilege: MbLikePrivilegeSchema.optional(),
  skin_profile_element: z.string().optional(),
  skin_cover_poster: z.string().optional(),
  skin_cover_image: z.string().optional(),
  pay_remind: z.number().optional(),
  pay_date: z.string().optional(),
  video_cover: VideoCoverSchema.optional(),
})
export type RawFollowingUser = z.infer<typeof UserSchema>

const RawFollowingsSchema = z.object({
  users: z.array(UserSchema),
  has_filtered_attentions: z.boolean(),
  next_cursor: z.number(),
  previous_cursor: z.number(),
  total_number: z.number(),
  use_sink_stragety: z.boolean(),
  has_filtered_fans: z.boolean(),
  use_status_strategy: z.boolean(),
  show_related_topic: z.boolean(),
  sort_type: z.number(),
  type: z.number(),
  show_unread: z.boolean(),
  fill_material: z.number(),
  screenName: z.string(),
  ok: z.number(),
})
export type RawFollowings = z.infer<typeof RawFollowingsSchema>
