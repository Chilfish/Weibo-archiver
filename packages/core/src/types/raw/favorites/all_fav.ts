import type { RawPostSchema } from '../statuses/mymblog'
import * as z from 'zod'
import { UrlStructSchema } from '../statuses/mymblog'

const NameEnumSchema = z.enum([
  'icon',
  'vip',
])

const PurpleAnnotationSchema = z.object({
  photo_sub_type: z.string().optional(),
  source_text: z.string().optional(),
  phone_id: z.string().optional(),
  mapi_request: z.boolean().optional(),
  shooting: z.number().optional(),
  client_mblogid: z.string().optional(),
  mode: z.string().optional(),
  origin: z.string().optional(),
  oid: z.string().optional(),
  type: z.string().optional(),
})

const CommentManageInfoSchema = z.object({
  comment_permission_type: z.number(),
  approval_comment_type: z.number(),
  comment_sort_type: z.number(),
  comment_manage_button: z.number().optional(),
  ai_play_picture_type: z.number().optional(),
})

const CommonStructActionlogSchema = z.object({
  act_code: z.string(),
  uid: z.string(),
  mid: z.number(),
  oid: z.string(),
  uicode: z.string(),
  cardid: z.string(),
  fid: z.null(),
  luicode: z.null(),
  lfid: z.null(),
  ext: z.string(),
  source: z.string(),
  shop_window_scene: z.null().optional(),
})

const PurpleActionlogSchema = z.object({
  act_code: z.number(),
  uid: z.string(),
  mid: z.number(),
  oid: z.string(),
  uicode: z.string(),
  cardid: z.string(),
  fid: z.null(),
  luicode: z.null(),
  lfid: z.null(),
  ext: z.string(),
  source: z.string(),
  shop_window_scene: z.null().optional(),
})

const PurpleParamsSchema = z.object({
  uid: z.string().optional(),
  scheme: z.string(),
  type: z.string().optional(),
})

const ContinueTagSchema = z.object({
  title: z.string(),
  pic: z.string(),
  scheme: z.string(),
})

const NumberDisplayStrategySchema = z.object({
  apply_scenario_flag: z.number(),
  display_text_min_number: z.number(),
  display_text: z.string(),
})

const PageInfoActionlogSchema = z.object({
  act_type: z.number(),
  act_code: z.number(),
  oid: z.string(),
  uuid: z.number(),
  cardid: z.string().optional(),
  lcardid: z.string(),
  uicode: z.string().optional(),
  luicode: z.string().optional(),
  fid: z.string(),
  lfid: z.string().optional(),
  ext: z.string(),
  source: z.string().optional(),
  fromlog: z.string().optional(),
  mid: z.string().optional(),
})

const AuthorInfoStatusTotalCounterSchema = z.object({
  total_cnt_format: z.string(),
  comment_cnt: z.string(),
  repost_cnt: z.string(),
  like_cnt: z.string(),
  total_cnt: z.string(),
})

const BigPicInfoPicBigSchema = z.object({
  height: z.number(),
  url: z.string(),
  width: z.number(),
})

const ExtInfoSchema = z.object({
  video_orientation: z.string(),
})

const ExtraInfoSchema = z.object({
  sceneid: z.string(),
})

const PlayCompletionActionActionlogSchema = z.object({
  oid: z.string(),
  act_code: z.number(),
  act_type: z.number(),
  source: z.string(),
  ext: z.string().optional(),
})

const ExtSchema = z.object({
  uid: z.string(),
  user_name: z.string(),
  followers_count: z.number(),
  verified: z.boolean(),
  verified_type: z.number(),
  verified_type_ext: z.number(),
  verified_reason: z.string(),
  level: z.number(),
})

const MetaSchema = z.object({
  label: z.string(),
  quality_index: z.number(),
  quality_desc: z.string(),
  quality_label: z.string(),
  quality_class: z.string(),
  type: z.number(),
  quality_group: z.number(),
  is_hidden: z.boolean(),
})

const TranscodeInfoSchema = z.object({
  pcdn_rule_id: z.number(),
  pcdn_jank: z.number(),
  origin_video_dr: z.string(),
  ab_strategies: z.string(),
})

const TitleElementSchema = z.object({
  default: z.boolean(),
  title: z.string(),
})

const VideoDownloadStrategySchema = z.object({
  abandon_download: z.number(),
})

const PicInfoPicBigSchema = z.object({
  height: z.string(),
  url: z.string(),
  width: z.string(),
})

const TransitionPicSchema = z.object({
  pic_big: PicInfoPicBigSchema,
})

const PageInfoUserSchema = z.object({
  id: z.string(),
  screen_name: z.string(),
  profile_image_url: z.string(),
  avatar_large: z.string(),
})

const FocusPointSchema = z.object({
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
})

const BmiddleSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  cut_type: z.number(),
  type: z.null(),
})

const FluffyAnnotationSchema = z.object({
  photo_sub_type: z.string().optional(),
  client_mblogid: z.string().optional(),
  source_text: z.string().optional(),
  phone_id: z.string().optional(),
  mapi_request: z.boolean().optional(),
})

const FluffyActionlogSchema = z.object({
  act_code: z.string(),
  oid: z.string(),
})

const ExtparamsSchema = z.object({
  followcardid: z.string(),
})

const TentacledParamsSchema = z.object({
  scheme: z.string(),
})

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

const VisibleSchema = z.object({
  type: z.number(),
  list_id: z.number(),
})

const ScreenNameSuffixNewActionlogSchema = z.object({
  act_code: z.number(),
  oid: z.string(),
  uicode: z.string(),
  luicode: z.null(),
  fid: z.null(),
  ext: z.string(),
})

const IconSchema = z.object({
  name: NameEnumSchema.optional(),
  url: z.string(),
  scheme: z.string().optional(),
  length: z.number().optional(),
  type: z.string().optional(),
})

const TruncationSchema = z.object({
  mode: z.number(),
  keep_end_size: z.number().optional(),
})

const StatusTitleSchema = z.object({
  text: z.string(),
  base_color: z.number(),
  icon_url: z.string(),
})

const TitleSourceSchema = z.object({
  name: z.string(),
  url: z.string(),
  image: z.string(),
})

const TopicStructSchema = z.object({
  title: z.string(),
  topic_url: z.string(),
  topic_title: z.string(),
  actionlog: PageInfoActionlogSchema,
})

const UrlStructActionlogSchema = z.object({
  act_type: z.number(),
  act_code: z.union([z.number(), z.string()]),
  oid: z.string().optional(),
  uuid: z.union([z.number(), z.string()]).optional(),
  cardid: z.string().optional(),
  lcardid: z.string().optional(),
  uicode: z.string().optional(),
  luicode: z.string().optional(),
  fid: z.string().optional(),
  lfid: z.string().optional(),
  ext: z.string(),
  source: z.string().optional(),
  mid: z.number().optional(),
  uid: z.number().optional(),
  from: z.string().optional(),
  fromlog: z.string().optional(),
})

const PurpleStatusTotalCounterSchema = z.object({
  total_cnt_format: z.union([z.number(), z.string()]),
  comment_cnt: z.string(),
  repost_cnt: z.string(),
  like_cnt: z.string(),
  total_cnt: z.string(),
})

const PurpleButtonSchema = z.object({
  name: z.string(),
  pic: z.string(),
  type: z.string(),
  params: PurpleParamsSchema,
  actionlog: PurpleActionlogSchema,
})

const AuthorInfoSchema = z.object({
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
  verified_type_ext: z.number(),
  status_total_counter: AuthorInfoStatusTotalCounterSchema,
  avatar_large: z.string(),
  avatar_hd: z.string(),
  follow_me: z.boolean(),
  following: z.boolean(),
  mbrank: z.number(),
  mbtype: z.number(),
  v_plus: z.number(),
  user_ability: z.number(),
  planet_video: z.boolean(),
  verified_reason: z.string(),
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
})

const BigPicInfoSchema = z.object({
  pic_big: BigPicInfoPicBigSchema,
  pic_small: BigPicInfoPicBigSchema,
  pic_middle: BigPicInfoPicBigSchema,
})

const PlayCompletionActionSchema = z.object({
  type: z.union([z.number(), z.string()]),
  icon: z.string(),
  text: z.string(),
  link: z.string(),
  btn_code: z.number(),
  show_position: z.number(),
  actionlog: PlayCompletionActionActionlogSchema,
  display_mode: z.number().optional(),
  display_starttime: z.number().optional(),
  display_endtime: z.number().optional(),
  countdown_time: z.number().optional(),
  scheme: z.string().optional(),
  ext: ExtSchema.optional(),
  display_type: z.number().optional(),
})

const ExtensionSchema = z.object({
  transcode_info: TranscodeInfoSchema,
})

const PageInfoPicInfoSchema = z.object({
  pic_big: PicInfoPicBigSchema,
  pic_small: PicInfoPicBigSchema.optional(),
  pic_middle: PicInfoPicBigSchema.optional(),
})

const PicFocusPointSchema = z.object({
  focus_point: FocusPointSchema,
  pic_id: z.string(),
})

const PicInfoValueSchema = z.object({
  thumbnail: BmiddleSchema,
  bmiddle: BmiddleSchema,
  large: BmiddleSchema,
  original: BmiddleSchema,
  largest: BmiddleSchema,
  mw2000: BmiddleSchema,
  largecover: BmiddleSchema,
  object_id: z.string(),
  pic_id: z.string(),
  photo_tag: z.number(),
  type: z.string(),
  pic_status: z.number(),
  focus_point: FocusPointSchema.optional(),
})

const FluffyParamsSchema = z.object({
  uid: z.number(),
  disable_group: z.number(),
  extparams: ExtparamsSchema,
})

const FluffyButtonSchema = z.object({
  name: z.string(),
  pic: z.string(),
  type: z.string(),
  params: TentacledParamsSchema,
  actionlog: PurpleActionlogSchema,
})

const IconListSchema = z.object({
  type: NameEnumSchema,
  data: DataSchema,
})

const ScreenNameSuffixNewSchema = z.object({
  content: z.string(),
  remark: z.string().optional(),
  color: z.string(),
  dark_color: z.string(),
  type: z.number(),
  icons: z.array(IconSchema).optional(),
  icons_location: z.number().optional(),
  truncation: TruncationSchema,
  scheme: z.string().optional(),
  actionlog: ScreenNameSuffixNewActionlogSchema.optional(),
})

const StatusUserSchema = z.object({
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
  status_total_counter: PurpleStatusTotalCounterSchema,
  avatar_large: z.string(),
  avatar_hd: z.string(),
  follow_me: z.boolean(),
  following: z.boolean(),
  mbrank: z.number(),
  mbtype: z.number(),
  v_plus: z.number(),
  user_ability: z.number(),
  planet_video: z.boolean(),
  icon_list: z.array(IconListSchema),
})

const StatusCommonStructSchema = z.object({
  url: z.string(),
  name: z.string(),
  desc: z.string(),
  img: z.string(),
  type: z.number(),
  btn_show_type: z.string().optional(),
  page_id: z.string(),
  actionlog: CommonStructActionlogSchema,
  buttons: z.array(PurpleButtonSchema),
  hidden: z.number().optional(),
})

const PlayInfoSchema = z.object({
  type: z.number(),
  mime: z.string(),
  protocol: z.string(),
  label: z.string(),
  url: z.string(),
  bitrate: z.number().optional(),
  prefetch_range: z.string(),
  video_codecs: z.string().optional(),
  fps: z.number().optional(),
  width: z.number(),
  height: z.number(),
  size: z.number().optional(),
  duration: z.number().optional(),
  sar: z.string().optional(),
  audio_codecs: z.string().optional(),
  audio_sample_rate: z.number().optional(),
  quality_label: z.string(),
  quality_class: z.string(),
  quality_desc: z.string(),
  audio_channels: z.number().optional(),
  audio_sample_fmt: z.string().optional(),
  audio_bits_per_sample: z.number().optional(),
  watermark: z.string().optional(),
  extension: ExtensionSchema,
  video_decoder: z.string(),
  prefetch_enabled: z.boolean(),
  tcp_receive_buffer: z.number(),
  dolby_atmos: z.boolean().optional(),
  color_transfer: z.string().optional(),
  stereo_video: z.number().optional(),
  first_pkt_end_pos: z.number().optional(),
  col: z.number().optional(),
  row: z.number().optional(),
  interval: z.number().optional(),
  offset: z.number().optional(),
  urls: z.array(z.string()).optional(),
})

const RetweetedStatusButtonSchema = z.object({
  type: z.string(),
  name: z.string(),
  params: FluffyParamsSchema,
  actionlog: FluffyActionlogSchema,
})

const RetweetedStatusCommonStructSchema = z.object({
  name: z.string(),
  url: z.string(),
  desc: z.string(),
  img: z.string(),
  type: z.number(),
  page_id: z.string(),
  actionlog: CommonStructActionlogSchema,
  buttons: z.array(FluffyButtonSchema),
})

const RetweetedStatusUserSchema = z.object({
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
  verified_type_ext: z.number(),
  status_total_counter: AuthorInfoStatusTotalCounterSchema,
  avatar_large: z.string(),
  avatar_hd: z.string(),
  follow_me: z.boolean(),
  following: z.boolean(),
  mbrank: z.number(),
  mbtype: z.number(),
  v_plus: z.number(),
  user_ability: z.number(),
  planet_video: z.boolean(),
  icon_list: z.array(IconListSchema),
})

const PlaybackListSchema = z.object({
  meta: MetaSchema,
  play_info: PlayInfoSchema,
})

const RetweetedStatusSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  id: z.number(),
  idstr: z.string(),
  mid: z.string(),
  mblogid: z.string(),
  user: RetweetedStatusUserSchema,
  can_edit: z.boolean(),
  edit_count: z.number().optional(),
  textLength: z.number(),
  source: z.string(),
  favorited: z.boolean(),
  rid: z.string(),
  pic_ids: z.array(z.string()),
  pic_focus_point: z.array(PicFocusPointSchema).optional(),
  geo: z.null(),
  pic_num: z.number(),
  pic_infos: z.record(z.string(), PicInfoValueSchema).optional(),
  is_paid: z.boolean(),
  mblog_vip_type: z.number(),
  number_display_strategy: NumberDisplayStrategySchema,
  reposts_count: z.number(),
  comments_count: z.number(),
  attitudes_count: z.number(),
  attitudes_status: z.number(),
  continue_tag: ContinueTagSchema.optional(),
  isLongText: z.boolean(),
  mlevel: z.number(),
  content_auth: z.number(),
  is_show_bulletin: z.number(),
  comment_manage_info: CommentManageInfoSchema,
  mblogtype: z.number(),
  showFeedRepost: z.boolean(),
  showFeedComment: z.boolean(),
  pictureViewerSign: z.boolean(),
  showPictureViewer: z.boolean(),
  rcList: z.array(z.any()),
  common_struct: z.array(RetweetedStatusCommonStructSchema).optional(),
  mixed_count: z.number(),
  is_show_mixed: z.boolean(),
  isSinglePayAudio: z.boolean(),
  text: z.string(),
  text_raw: z.string(),
  region_name: z.string(),
  annotations: z.array(z.union([z.array(z.any()), FluffyAnnotationSchema])).optional(),
  buttons: z.array(RetweetedStatusButtonSchema).optional(),
  cardid: z.string().optional(),
})

const MediaInfoSchema = z.object({
  name: z.string(),
  stream_url: z.string(),
  stream_url_hd: z.string(),
  format: z.string(),
  h5_url: z.string(),
  mp4_sd_url: z.string(),
  mp4_hd_url: z.string(),
  h265_mp4_hd: z.string(),
  h265_mp4_ld: z.string(),
  inch_4_mp4_hd: z.string(),
  inch_5_mp4_hd: z.string(),
  inch_5_5_mp4_hd: z.string(),
  mp4_720p_mp4: z.string(),
  hevc_mp4_720p: z.string(),
  prefetch_type: z.number(),
  prefetch_size: z.number(),
  act_status: z.number(),
  protocol: z.string(),
  media_id: z.string(),
  origin_total_bitrate: z.number(),
  video_orientation: z.string(),
  duration: z.number(),
  forward_strategy: z.number(),
  search_scheme: z.string(),
  is_short_video: z.number(),
  vote_is_show: z.number(),
  belong_collection: z.number(),
  titles_display_time: z.string(),
  show_progress_bar: z.number(),
  show_mute_button: z.boolean(),
  ext_info: ExtInfoSchema,
  next_title: z.string(),
  kol_title: z.string(),
  play_completion_actions: z.array(PlayCompletionActionSchema),
  video_publish_time: z.number(),
  play_loop_type: z.number(),
  titles: z.array(TitleElementSchema),
  author_mid: z.string(),
  author_name: z.string(),
  extra_info: ExtraInfoSchema,
  video_download_strategy: VideoDownloadStrategySchema,
  jump_to: z.number(),
  big_pic_info: BigPicInfoSchema,
  online_users: z.string(),
  online_users_number: z.number(),
  ttl: z.number(),
  storage_type: z.string(),
  author_info: AuthorInfoSchema,
  playback_list: z.array(PlaybackListSchema),
})

const PageInfoSchema = z.object({
  type: z.union([z.number(), z.string()]),
  page_id: z.string(),
  object_type: z.string(),
  page_desc: z.string().optional(),
  oid: z.union([z.number(), z.string()]).optional(),
  page_title: z.string(),
  page_pic: z.string(),
  type_icon: z.string().optional(),
  page_url: z.string(),
  object_id: z.string(),
  author_id: z.union([z.number(), z.string()]).optional(),
  authorid: z.union([z.number(), z.string()]).optional(),
  content1: z.string(),
  content2: z.string(),
  content3: z.string().optional(),
  preload: z.boolean().optional(),
  content4: z.string().optional(),
  user: PageInfoUserSchema.optional(),
  pic_info: PageInfoPicInfoSchema.optional(),
  source_type: z.string().optional(),
  button_type: z.string().optional(),
  button_follow_uid: z.string().optional(),
  need_lmid: z.string().optional(),
  actionlog: PageInfoActionlogSchema,
  transition_pics: z.array(TransitionPicSchema).optional(),
  alpha_time: z.string().optional(),
  pause_time: z.string().optional(),
  act_status: z.number().optional(),
  media_info: MediaInfoSchema.optional(),
  warn: z.string().optional(),
  short_url: z.string().optional(),
})

const StatusSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  id: z.number(),
  idstr: z.string(),
  mid: z.string(),
  mblogid: z.string(),
  user: StatusUserSchema,
  can_edit: z.boolean(),
  textLength: z.number().optional(),
  annotations: z.array(z.union([z.array(z.any()), PurpleAnnotationSchema])).optional(),
  source: z.string(),
  favorited: z.boolean(),
  rid: z.string(),
  pic_ids: z.array(z.string()),
  pic_num: z.number(),
  pic_infos: z.record(z.string(), PicInfoValueSchema).optional(),
  is_paid: z.boolean(),
  mblog_vip_type: z.number(),
  number_display_strategy: NumberDisplayStrategySchema,
  reposts_count: z.number(),
  comments_count: z.number(),
  attitudes_count: z.number(),
  attitudes_status: z.number(),
  isLongText: z.boolean(),
  mlevel: z.number(),
  content_auth: z.number(),
  is_show_bulletin: z.number(),
  comment_manage_info: CommentManageInfoSchema,
  share_repost_type: z.number(),
  topic_struct: z.array(TopicStructSchema).optional(),
  mblogtype: z.number(),
  showFeedRepost: z.boolean(),
  showFeedComment: z.boolean(),
  pictureViewerSign: z.boolean(),
  showPictureViewer: z.boolean(),
  rcList: z.array(z.any()),
  can_remark: z.boolean().optional(),
  analysis_extra: z.string(),
  readtimetype: z.string(),
  mixed_count: z.number(),
  is_show_mixed: z.boolean(),
  isSinglePayAudio: z.boolean(),
  text: z.string(),
  text_raw: z.string(),
  region_name: z.string(),
  tags: z.array(z.any()),
  cardid: z.string().optional(),
  pic_bg_new: z.string().optional(),
  continue_tag: ContinueTagSchema.optional(),
  url_struct: z.array(UrlStructSchema).optional(),
  pic_focus_point: z.array(PicFocusPointSchema).optional(),
  title_source: TitleSourceSchema.optional(),
  screen_name_suffix_new: z.array(ScreenNameSuffixNewSchema).optional(),
  common_struct: z.array(StatusCommonStructSchema).optional(),
  edit_count: z.number().optional(),
  repost_type: z.number().optional(),
  retweeted_status: RetweetedStatusSchema.optional(),
  title: StatusTitleSchema.optional(),
  page_info: PageInfoSchema.optional(),
})

const FavoriteSchema = z.object({
  status: z.array(StatusSchema),
  total_number: z.number(),
})

export type RawFavoriteList = z.infer<typeof FavoriteSchema>
export type RawFavorite = z.infer<typeof RawPostSchema>
