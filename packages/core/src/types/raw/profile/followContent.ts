import * as z from 'zod'

const GenderSchema = z.enum([
  'f',
  'm',
])
type Gender = z.infer<typeof GenderSchema>

const LangSchema = z.enum([
  'en',
  'zh-cn',
  'zh-tw',
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

const PurpleAnnotationSchema = z.object({
  photo_sub_type: z.string().optional(),
  client_mblogid: z.string().optional(),
  source_text: z.string().optional(),
  phone_id: z.string().optional(),
  mapi_request: z.boolean().optional(),
  shooting: z.number().optional(),
})
type PurpleAnnotation = z.infer<typeof PurpleAnnotationSchema>

const CommentManageInfoSchema = z.object({
  comment_permission_type: z.number(),
  approval_comment_type: z.number(),
  comment_sort_type: z.number(),
  ai_play_picture_type: z.number(),
  approval_op_from: z.number().optional(),
})
type CommentManageInfo = z.infer<typeof CommentManageInfoSchema>

const AdSchema = z.object({
  url_marked: z.string(),
})
type Ad = z.infer<typeof AdSchema>

const AdNatureSchema = z.object({
  ad_nature: z.string(),
})
type AdNature = z.infer<typeof AdNatureSchema>

const AdSemanticBrandSchema = z.object({
  ad_semantic_brand: z.boolean(),
})
type AdSemanticBrand = z.infer<typeof AdSemanticBrandSchema>

const ShopwindowCardSchema = z.object({
  adid: z.string(),
  pos: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  source: z.string(),
})
type ShopwindowCard = z.infer<typeof ShopwindowCardSchema>

const SuperTopicExtendSchema = z.object({
  topic_id: z.string(),
})
type SuperTopicExtend = z.infer<typeof SuperTopicExtendSchema>

const StatusHotPageSchema = z.object({
  fid: z.string(),
  feed_detail_type: z.number(),
})
type StatusHotPage = z.infer<typeof StatusHotPageSchema>

const VisibleSchema = z.object({
  type: z.number(),
  list_id: z.number(),
})
type Visible = z.infer<typeof VisibleSchema>

const StatusTotalCounterSchema = z.object({
  total_cnt: z.number(),
  repost_cnt: z.number(),
  comment_cnt: z.number(),
  like_cnt: z.number(),
  comment_like_cnt: z.number(),
})
type StatusTotalCounter = z.infer<typeof StatusTotalCounterSchema>

const VerifyExtendSchema = z.object({
  real_name_verified: z.string(),
})
type VerifyExtend = z.infer<typeof VerifyExtendSchema>

const VideoCoverSchema = z.object({
  mid: z.number(),
})
type VideoCover = z.infer<typeof VideoCoverSchema>

const VideoTotalCounterSchema = z.object({
  play_cnt: z.number(),
})
type VideoTotalCounter = z.infer<typeof VideoTotalCounterSchema>

const PlaceSchema = z.object({
  poiid: z.string(),
  title: z.string(),
  type: z.string(),
  spot_type: z.string(),
})
type Place = z.infer<typeof PlaceSchema>

const AudioCommentSummarySchema = z.object({
  comment_summary_oid: z.string(),
  audio_oid: z.string(),
})
type AudioCommentSummary = z.infer<typeof AudioCommentSummarySchema>

const AudioSummarySchema = z.object({
  summary_oid: z.string(),
  audio_oid: z.string(),
})
type AudioSummary = z.infer<typeof AudioSummarySchema>

const ExtendInfoHotPageSchema = z.object({
  topic: z.string(),
})
type ExtendInfoHotPage = z.infer<typeof ExtendInfoHotPageSchema>

const PurpleExtendInfoSchema = z.object({
  ad_semantic_brand: z.array(AdSemanticBrandSchema).optional(),
  shopwindow_cards: z.array(ShopwindowCardSchema).optional(),
  super_topic_extend: SuperTopicExtendSchema.optional(),
  ad_nature: AdNatureSchema.optional(),
  ad: AdSchema.optional(),
})
type PurpleExtendInfo = z.infer<typeof PurpleExtendInfoSchema>

const DatumSchema = z.object({
  key: z.number(),
  sub_key: z.number().optional(),
  weight: z.number(),
  desc: z.string(),
  timestamp: z.number().optional(),
  verify_extend: VerifyExtendSchema.optional(),
})
type Datum = z.infer<typeof DatumSchema>

const FluffyAnnotationSchema = z.object({
  mapi_request: z.boolean().optional(),
  photo_sub_type: z.string().optional(),
  spot_type: z.string().optional(),
  place: PlaceSchema.optional(),
  source_text: z.string().optional(),
  phone_id: z.string().optional(),
  client_mblogid: z.string().optional(),
  mode: GenderSchema.optional(),
  origin: z.string().optional(),
  shooting: z.number().optional(),
  ann_ext: z.string().optional(),
})
type FluffyAnnotation = z.infer<typeof FluffyAnnotationSchema>

const FluffyExtendInfoSchema = z.object({
  ad: AdSchema.optional(),
  hot_page: ExtendInfoHotPageSchema.optional(),
  super_topic_extend: SuperTopicExtendSchema.optional(),
  audio_summary: AudioSummarySchema.optional(),
  audio_comment_summary: AudioCommentSummarySchema.optional(),
})
type FluffyExtendInfo = z.infer<typeof FluffyExtendInfoSchema>

const PurpleStatusSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  idstr: z.string(),
  mid: z.string(),
  can_edit: z.boolean(),
  version: z.number().optional(),
  show_additional_indication: z.number(),
  text: z.string(),
  textLength: z.number().optional(),
  appid: z.number(),
  favorited: z.boolean(),
  truncated: z.boolean(),
  in_reply_to_status_id: z.string(),
  in_reply_to_user_id: z.string(),
  in_reply_to_screen_name: z.string(),
  pic_ids: z.array(z.string()),
  pic_types: z.string(),
  thumbnail_pic: z.string().optional(),
  bmiddle_pic: z.string().optional(),
  original_pic: z.string().optional(),
  geo: z.null(),
  is_paid: z.boolean(),
  mblog_vip_type: z.number(),
  reposts_count: z.number(),
  comments_count: z.number(),
  reprint_cmt_count: z.number(),
  attitudes_count: z.number(),
  mixed_count: z.number(),
  pending_approval_count: z.number(),
  isLongText: z.boolean(),
  reward_exhibition_type: z.number(),
  show_mlevel: z.number(),
  biz_feature: z.number(),
  page_type: z.number().optional(),
  hasActionTypeCard: z.number(),
  darwin_tags: z.array(z.any()),
  ad_marked: z.boolean(),
  hot_weibo_tags: z.array(z.any()),
  mblogtype: z.number(),
  item_category: z.string(),
  rid: z.string(),
  userType: z.number(),
  more_info_type: z.number(),
  positive_recom_flag: z.number(),
  content_auth: z.number(),
  gif_ids: z.string(),
  is_show_bulletin: z.number(),
  is_show_mixed: z.boolean(),
  safe_tags: z.number().optional(),
  comment_manage_info: CommentManageInfoSchema,
  pic_num: z.number(),
  hot_page: StatusHotPageSchema,
  can_reprint: z.boolean(),
  new_comment_style: z.number(),
  mlevel: z.number(),
  detail_bottom_bar: z.number(),
  hide_flag: z.number(),
  annotations: z.array(PurpleAnnotationSchema).optional(),
  pic_video: z.string().optional(),
  picStatus: z.string().optional(),
  cardid: z.string().optional(),
  repost_type: z.number().optional(),
  extend_info: PurpleExtendInfoSchema.optional(),
  edit_count: z.number().optional(),
  edit_at: z.string().optional(),
  biz_ids: z.array(z.number()).optional(),
  fid: z.number().optional(),
  mark: z.string().optional(),
  topic_id: z.string().optional(),
  sync_mblog: z.boolean().optional(),
  is_imported_topic: z.boolean().optional(),
  expire_time: z.number().optional(),
  ad_state: z.number().optional(),
})
type PurpleStatus = z.infer<typeof PurpleStatusSchema>

const VerifiedDetailSchema = z.object({
  custom: z.number(),
  data: z.array(DatumSchema),
})
type VerifiedDetail = z.infer<typeof VerifiedDetailSchema>

const FluffyStatusSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  idstr: z.string(),
  mid: z.string(),
  can_edit: z.boolean(),
  version: z.number().optional(),
  show_additional_indication: z.number(),
  text: z.string(),
  appid: z.number(),
  favorited: z.boolean(),
  truncated: z.boolean(),
  in_reply_to_status_id: z.string(),
  in_reply_to_user_id: z.string(),
  in_reply_to_screen_name: z.string(),
  pic_ids: z.array(z.string()),
  pic_types: z.string(),
  geo: z.null(),
  is_paid: z.boolean(),
  mblog_vip_type: z.number(),
  annotations: z.array(FluffyAnnotationSchema).optional(),
  reposts_count: z.number(),
  comments_count: z.number(),
  reprint_cmt_count: z.number(),
  attitudes_count: z.number(),
  mixed_count: z.number(),
  pending_approval_count: z.number(),
  isLongText: z.boolean(),
  reward_exhibition_type: z.number(),
  show_mlevel: z.number(),
  biz_feature: z.number(),
  hasActionTypeCard: z.number(),
  darwin_tags: z.array(z.any()),
  ad_marked: z.boolean(),
  hot_weibo_tags: z.array(z.any()),
  mblogtype: z.number(),
  item_category: z.string(),
  rid: z.string(),
  userType: z.number(),
  more_info_type: z.number(),
  positive_recom_flag: z.number(),
  content_auth: z.number(),
  gif_ids: z.string(),
  is_show_bulletin: z.number(),
  is_show_mixed: z.boolean(),
  safe_tags: z.number().optional(),
  comment_manage_info: CommentManageInfoSchema,
  repost_type: z.number().optional(),
  pic_num: z.number(),
  hot_page: StatusHotPageSchema,
  can_reprint: z.boolean(),
  new_comment_style: z.number(),
  mlevel: z.number(),
  detail_bottom_bar: z.number(),
  hide_flag: z.number(),
  textLength: z.number().optional(),
  thumbnail_pic: z.string().optional(),
  bmiddle_pic: z.string().optional(),
  original_pic: z.string().optional(),
  biz_ids: z.array(z.number()).optional(),
  bus_flag: z.number().optional(),
  picStatus: z.string().optional(),
  topic_id: z.string().optional(),
  sync_mblog: z.boolean().optional(),
  is_imported_topic: z.boolean().optional(),
  page_type: z.number().optional(),
  cardid: z.string().optional(),
  edit_count: z.number().optional(),
  edit_at: z.string().optional(),
  mark: z.string().optional(),
  ad_state: z.number().optional(),
  extend_info: FluffyExtendInfoSchema.optional(),
  mix_media_ids: z.array(z.string()).optional(),
  fid: z.number().optional(),
  is_all_video: z.boolean().optional(),
  stickerID: z.string().optional(),
  pic_video: z.string().optional(),
  mlevelSource: z.string().optional(),
  pass_audit_time: z.number().optional(),
})
type FluffyStatus = z.infer<typeof FluffyStatusSchema>

const FollowsUserSchema = z.object({
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
  status: PurpleStatusSchema,
  ptype: z.number(),
  allow_all_comment: z.boolean(),
  avatar_large: z.string(),
  avatar_hd: z.string(),
  verified_reason: z.string(),
  verified_trade: z.string(),
  verified_reason_url: z.string(),
  verified_source: z.string(),
  verified_source_url: z.string(),
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
  urank: z.number(),
  story_read_state: z.number(),
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
  content1: z.string(),
  content2: z.string(),
  cover_image_phone: z.string().optional(),
  verified_state: z.number().optional(),
  verified_level: z.number().optional(),
  verified_type_ext: z.number().optional(),
  has_service_tel: z.boolean().optional(),
  verified_reason_modified: z.string().optional(),
  verified_contact_name: z.string().optional(),
  verified_contact_email: z.string().optional(),
  verified_contact_mobile: z.string().optional(),
  cardid: z.string().optional(),
  avatargj_id: z.string().optional(),
  verified_detail: VerifiedDetailSchema.optional(),
  video_cover: VideoCoverSchema.optional(),
  pay_remind: z.number().optional(),
  pay_date: z.string().optional(),
  mb_like_privilege: MbLikePrivilegeSchema.optional(),
  skin_profile_element: z.string().optional(),
  skin_cover_poster: z.string().optional(),
  skin_cover_image: z.string().optional(),
  cover_image: z.string().optional(),
  attitude_style: z.string().optional(),
})
export type RawMyFollowUser = z.infer<typeof FollowsUserSchema>

const SpecialAttentionUserSchema = z.object({
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
  status: FluffyStatusSchema.optional(),
  ptype: z.number(),
  allow_all_comment: z.boolean(),
  avatar_large: z.string(),
  avatar_hd: z.string(),
  verified_reason: z.string(),
  verified_trade: z.string(),
  verified_reason_url: z.string(),
  verified_source: z.string(),
  verified_source_url: z.string(),
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
  urank: z.number(),
  story_read_state: z.number(),
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
  content1: z.string().optional(),
  content2: z.string().optional(),
  verified_state: z.number().optional(),
  verified_level: z.number().optional(),
  verified_type_ext: z.number().optional(),
  has_service_tel: z.boolean().optional(),
  verified_reason_modified: z.string().optional(),
  verified_contact_name: z.string().optional(),
  verified_contact_email: z.string().optional(),
  verified_contact_mobile: z.string().optional(),
  verified_detail: VerifiedDetailSchema.optional(),
  pay_remind: z.number().optional(),
  pay_date: z.string().optional(),
  cover_image: z.string().optional(),
  cardid: z.string().optional(),
  avatargj_id: z.string().optional(),
  video_cover: VideoCoverSchema.optional(),
  location_rights: z.number().optional(),
  ability_tags: z.string().optional(),
  status_id: z.number().optional(),
  status_idstr: z.string().optional(),
})
type SpecialAttentionUser = z.infer<typeof SpecialAttentionUserSchema>

const FollowsSchema = z.object({
  users: z.array(FollowsUserSchema),
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
})
type Follows = z.infer<typeof FollowsSchema>

const SpecialAttentionSchema = z.object({
  name: z.string(),
  users: z.array(SpecialAttentionUserSchema),
  list_id: z.string(),
})
type SpecialAttention = z.infer<typeof SpecialAttentionSchema>

const RawMyFollowingsSchema = z.object({
  specialAttention: SpecialAttentionSchema,
  follows: FollowsSchema,
  total_number: z.number(),
})
export type RawMyFollowings = z.infer<typeof RawMyFollowingsSchema>
