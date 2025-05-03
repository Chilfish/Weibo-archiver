import * as z from 'zod'

const ObjectTypeSchema = z.enum([
  'article',
  'live',
  'video',
])
type ObjectType = z.infer<typeof ObjectTypeSchema>

const VideoOrientationSchema = z.enum([
  'horizontal',
  'vertical',
])
type VideoOrientation = z.infer<typeof VideoOrientationSchema>

const SceneidSchema = z.enum([
  'profile_mb',
])
type Sceneid = z.infer<typeof SceneidSchema>

const FormatSchema = z.enum([
  'mp4',
])
type Format = z.infer<typeof FormatSchema>

const TextSchema = z.enum([
  '',
  '重播',
])
type Text = z.infer<typeof TextSchema>

const LabelSchema = z.enum([
  'mp4_1080p',
  'mp4_720p',
  'mp4_hd',
  'mp4_ld',
  'scrubber_hd',
])
type Label = z.infer<typeof LabelSchema>

const QualityClassSchema = z.enum([
  'HD',
  'SD',
])
type QualityClass = z.infer<typeof QualityClassSchema>

const QualityDescSchema = z.enum([
  '标清',
  '流畅',
  '高清',
])
type QualityDesc = z.infer<typeof QualityDescSchema>

const QualityLabelSchema = z.enum([
  '1080p',
  '360p',
  '480p',
  '720p',
])
type QualityLabel = z.infer<typeof QualityLabelSchema>

const AudioCodecsSchema = z.enum([
  'mp4a.40.5',
])
type AudioCodecs = z.infer<typeof AudioCodecsSchema>

const AudioSampleFmtSchema = z.enum([
  'fltp',
])
type AudioSampleFmt = z.infer<typeof AudioSampleFmtSchema>

const ColorTransferSchema = z.enum([
  'bt709',
])
type ColorTransfer = z.infer<typeof ColorTransferSchema>

const AbStrategiesSchema = z.enum([
  '13038-g1,,15568-g4,8013-g0,3601-g39',
  '13038-g1,,15568-g4,8013-g0,3601-g39,3601-g32,3601-g39',
  '13038-g1,,15568-g4,8013-g0,3601-g39,3601-g36,3601-g39',
])
type AbStrategies = z.infer<typeof AbStrategiesSchema>

const OriginVideoDrSchema = z.enum([
  'SDR',
])
type OriginVideoDr = z.infer<typeof OriginVideoDrSchema>

const MimeSchema = z.enum([
  'image/jpeg',
  'video/mp4',
])
type Mime = z.infer<typeof MimeSchema>

const PlayInfoProtocolSchema = z.enum([
  'general',
])
type PlayInfoProtocol = z.infer<typeof PlayInfoProtocolSchema>

const VideoCodecsSchema = z.enum([
  'avc1.640016',
  'avc1.64001e',
  'avc1.64001f',
  'avc1.640032',
])
type VideoCodecs = z.infer<typeof VideoCodecsSchema>

const VideoDecoderSchema = z.enum([
  'hard',
])
type VideoDecoder = z.infer<typeof VideoDecoderSchema>

const WatermarkSchema = z.enum([
  'none',
])
type Watermark = z.infer<typeof WatermarkSchema>

const MediaInfoProtocolSchema = z.enum([
  'general,dash',
])
type MediaInfoProtocol = z.infer<typeof MediaInfoProtocolSchema>

const SearchSchemeSchema = z.enum([
  'sinaweibo://svssearch?containerid=232080',
])
type SearchScheme = z.infer<typeof SearchSchemeSchema>

const StorageTypeSchema = z.enum([
  '',
  'oss',
])
type StorageType = z.infer<typeof StorageTypeSchema>

const PicInfoTypeSchema = z.enum([
  'pic',
])
type PicInfoType = z.infer<typeof PicInfoTypeSchema>

const ReadtimetypeSchema = z.enum([
  'mblog',
])
type Readtimetype = z.infer<typeof ReadtimetypeSchema>

const IconListTypeSchema = z.enum([
  'vip',
])
type IconListType = z.infer<typeof IconListTypeSchema>

const ActionlogActionlogSchema = z.object({
  act_code: z.number(),
  act_type: z.number(),
  ext: z.string(),
  fid: z.string(),
  lcardid: z.string(),
  mid: z.string(),
  oid: z.string(),
  source: z.string(),
  uuid: z.number(),
})

const MixMediaInfoSchema = z.object({
  items: z.array(
    z.object({
      actionlog: z.union([z.array(z.any()), ActionlogActionlogSchema]),
      data: z.any(), // TODO
      id: z.string(),
      scheme: z.string(),
      type: z.string(),
    }),
  ),
})

const AnnotationClassSchema = z.object({
  source_text: z.string().optional(),
  phone_id: z.string().optional(),
  mapi_request: z.boolean().optional(),
  photo_sub_type: z.string().optional(),
  oid: z.string().optional(),
  type: ObjectTypeSchema.optional(),
  shooting: z.number().optional(),
})
type AnnotationClass = z.infer<typeof AnnotationClassSchema>

const CommentManageInfoSchema = z.object({
  comment_permission_type: z.number(),
  approval_comment_type: z.number(),
  comment_sort_type: z.number(),
  approval_op_from: z.number().optional(),
  ai_assistant_comment_type: z.number().optional(),
  ai_play_picture_type: z.number().optional(),
})
type CommentManageInfo = z.infer<typeof CommentManageInfoSchema>

const ContentAuthListSchema = z.object({
  content_auth: z.number(),
  show_type: z.number(),
  rank: z.number(),
})
type ContentAuthList = z.infer<typeof ContentAuthListSchema>

const ContinueTagSchema = z.object({
  title: z.string(),
  pic: z.string(),
  scheme: z.string(),
  cleaned: z.boolean(),
})
type ContinueTag = z.infer<typeof ContinueTagSchema>

const NumberDisplayStrategySchema = z.object({
  apply_scenario_flag: z.number(),
  display_text_min_number: z.number(),
  display_text: z.string(),
})
type NumberDisplayStrategy = z.infer<typeof NumberDisplayStrategySchema>

const PageInfoActionlogSchema = z.object({
  act_type: z.number(),
  act_code: z.number(),
  lcardid: z.string(),
  fid: z.string(),
  mid: z.string().optional(),
  oid: z.string(),
  uuid: z.number(),
  source: z.string().optional(),
  ext: z.string(),
  cardid: z.string().optional(),
  uicode: z.string().optional(),
  luicode: z.string().optional(),
  lfid: z.string().optional(),
  fromlog: z.string().optional(),
})
type PageInfoActionlog = z.infer<typeof PageInfoActionlogSchema>

const AuthorSchema = z.object({
  vip: z.string(),
  screen_name: z.string(),
})
type Author = z.infer<typeof AuthorSchema>

const ButtonActionlogSchema = z.object({
  act_code: z.number(),
  oid: z.string(),
  cardid: z.string(),
  uicode: z.string(),
  fid: z.string(),
  ext: z.string(),
})
type ButtonActionlog = z.infer<typeof ButtonActionlogSchema>

const ParamsSchema = z.object({
  uid: z.string(),
})
type Params = z.infer<typeof ParamsSchema>

const LiveSchema = z.object({
  height: z.string(),
  width: z.string(),
  bitrate: z.string(),
})
type Live = z.infer<typeof LiveSchema>

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
type AuthorInfo = z.infer<typeof AuthorInfoSchema>

const BigPicInfoPicBigSchema = z.object({
  height: z.number(),
  url: z.string(),
  width: z.number(),
})
type BigPicInfoPicBig = z.infer<typeof BigPicInfoPicBigSchema>

const ExtInfoSchema = z.object({
  video_orientation: z.string(),
})
type ExtInfo = z.infer<typeof ExtInfoSchema>

const ExtraInfoSchema = z.object({
  sceneid: z.string(),
})
type ExtraInfo = z.infer<typeof ExtraInfoSchema>

const PlayCompletionActionActionlogSchema = z.object({
  oid: z.string(),
  act_code: z.number(),
  act_type: z.number(),
  source: ObjectTypeSchema,
  ext: z.string().optional(),
})
type PlayCompletionActionActionlog = z.infer<typeof PlayCompletionActionActionlogSchema>

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
type Ext = z.infer<typeof ExtSchema>

const MetaSchema = z.object({
  label: LabelSchema,
  quality_index: z.number(),
  quality_desc: QualityDescSchema,
  quality_label: QualityLabelSchema,
  quality_class: QualityClassSchema,
  type: z.number(),
  quality_group: z.number(),
  is_hidden: z.boolean(),
})
type Meta = z.infer<typeof MetaSchema>

const TranscodeInfoSchema = z.object({
  pcdn_rule_id: z.number(),
  pcdn_jank: z.number(),
  origin_video_dr: OriginVideoDrSchema,
  ab_strategies: AbStrategiesSchema,
})
type TranscodeInfo = z.infer<typeof TranscodeInfoSchema>

const SubscribeSchema = z.object({
  is_subscribe: z.boolean(),
  cover: z.string(),
  base_cover: z.string(),
  base_cover_landscape: z.string(),
  subscribe_id: z.string(),
  cover_pid: z.string(),
  background_id: z.string(),
  background_cover: z.string(),
  background_custom_pid: z.string(),
  is_expired: z.boolean(),
})
type Subscribe = z.infer<typeof SubscribeSchema>

const VideoDownloadStrategySchema = z.object({
  abandon_download: z.number(),
})
type VideoDownloadStrategy = z.infer<typeof VideoDownloadStrategySchema>

const PicInfoPicBigSchema = z.object({
  height: z.string(),
  url: z.string(),
  width: z.string(),
})
type PicInfoPicBig = z.infer<typeof PicInfoPicBigSchema>

const TransitionPicSchema = z.object({
  pic_big: PicInfoPicBigSchema,
})
type TransitionPic = z.infer<typeof TransitionPicSchema>

const PageInfoUserSchema = z.object({
  id: z.string(),
  screen_name: z.string(),
  profile_image_url: z.string(),
  avatar_large: z.string(),
})
type PageInfoUser = z.infer<typeof PageInfoUserSchema>

const FocusPointSchema = z.object({
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
})
type FocusPoint = z.infer<typeof FocusPointSchema>

const BmiddleSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  cut_type: z.number(),
  type: z.string(),
})
type Bmiddle = z.infer<typeof BmiddleSchema>

const DataSchema = z.object({
  mbrank: z.number(),
  mbtype: z.number(),
  svip: z.number(),
  vvip: z.number(),
})
type Data = z.infer<typeof DataSchema>

const VisibleSchema = z.object({
  type: z.number(),
  list_id: z.number(),
})
type Visible = z.infer<typeof VisibleSchema>

const TopicStructSchema = z.object({
  title: z.string(),
  topic_url: z.string(),
  topic_title: z.string(),
  actionlog: PageInfoActionlogSchema,
  topic_title_color: z.string().optional(),
  topic_title_color_dark: z.string().optional(),
})
type TopicStruct = z.infer<typeof TopicStructSchema>

const UrlStructActionlogSchema = z.object({
  act_type: z.number(),
  act_code: z.number(),
  oid: z.string(),
  uuid: z.union([z.number(), z.string()]),
  cardid: z.string().optional(),
  lcardid: z.string(),
  uicode: z.string().optional(),
  luicode: z.string().optional(),
  fid: z.string(),
  lfid: z.string().optional(),
  ext: z.string(),
  mid: z.string().optional(),
  source: ObjectTypeSchema.optional(),
  fromlog: z.string().optional(),
})
type UrlStructActionlog = z.infer<typeof UrlStructActionlogSchema>

const ButtonSchema = z.object({
  skip_format: z.number(),
  type: z.string(),
  name: z.string(),
  params: ParamsSchema,
  actionlog: ButtonActionlogSchema,
})
type Button = z.infer<typeof ButtonSchema>

const BigPicInfoSchema = z.object({
  pic_big: BigPicInfoPicBigSchema,
  pic_small: BigPicInfoPicBigSchema,
  pic_middle: BigPicInfoPicBigSchema,
})
type BigPicInfo = z.infer<typeof BigPicInfoSchema>

const PlayCompletionActionSchema = z.object({
  type: z.union([z.number(), z.string()]),
  icon: z.string(),
  text: TextSchema,
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
type PlayCompletionAction = z.infer<typeof PlayCompletionActionSchema>

const ExtensionSchema = z.object({
  transcode_info: TranscodeInfoSchema,
})
type Extension = z.infer<typeof ExtensionSchema>

const PageInfoPicInfoSchema = z.object({
  pic_big: PicInfoPicBigSchema,
  pic_small: PicInfoPicBigSchema.optional(),
  pic_middle: PicInfoPicBigSchema.optional(),
})
type PageInfoPicInfo = z.infer<typeof PageInfoPicInfoSchema>

const PicFocusPointSchema = z.object({
  focus_point: FocusPointSchema,
  pic_id: z.string(),
})
type PicFocusPoint = z.infer<typeof PicFocusPointSchema>

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
  type: PicInfoTypeSchema,
  pic_status: z.number(),
  focus_point: FocusPointSchema.optional(),
})
type PicInfoValue = z.infer<typeof PicInfoValueSchema>

const IconListSchema = z.object({
  type: IconListTypeSchema,
  data: DataSchema,
})
type IconList = z.infer<typeof IconListSchema>

const ImageMetaSchema = z.object({
  croped: z.boolean().optional(),
  cut_type: z.number(),
  height: z.number(),
  type: z.string(),
  url: z.string(),
  width: z.number(),
})

export const UrlStructSchema = z.object({
  url_title: z.string(),
  url_type_pic: z.string(),
  ori_url: z.string(),
  page_id: z.string().optional(),
  short_url: z.string(),
  long_url: z.string(),
  url_type: z.number(),
  result: z.boolean(),
  actionlog: UrlStructActionlogSchema,
  storage_type: StorageTypeSchema,
  hide: z.number(),
  object_type: z.string().optional(),
  ttl: z.number().optional(),
  h5_target_url: z.string().optional(),
  need_save_obj: z.number(),
  position: z.number().optional(),
  log: z.string().optional(),
  pic_infos: z.record(
    z.string(),
    z.object({
      woriginal: ImageMetaSchema,
    }),
  ).optional(),
})
export type RawUrlStruct = z.infer<typeof UrlStructSchema>

const PlayInfoSchema = z.object({
  type: z.number(),
  mime: MimeSchema,
  protocol: PlayInfoProtocolSchema,
  label: LabelSchema,
  url: z.string(),
  bitrate: z.number().optional(),
  prefetch_range: z.string(),
  video_codecs: VideoCodecsSchema.optional(),
  fps: z.number().optional(),
  width: z.number(),
  height: z.number(),
  size: z.number().optional(),
  duration: z.number().optional(),
  sar: z.string().optional(),
  audio_codecs: AudioCodecsSchema.optional(),
  audio_sample_rate: z.number().optional(),
  quality_label: QualityLabelSchema,
  quality_class: QualityClassSchema,
  quality_desc: QualityDescSchema,
  audio_channels: z.number().optional(),
  audio_sample_fmt: AudioSampleFmtSchema.optional(),
  audio_bits_per_sample: z.number().optional(),
  watermark: WatermarkSchema.optional(),
  extension: ExtensionSchema,
  video_decoder: VideoDecoderSchema,
  prefetch_enabled: z.boolean(),
  tcp_receive_buffer: z.number(),
  dolby_atmos: z.boolean().optional(),
  stereo_video: z.number().optional(),
  first_pkt_end_pos: z.number().optional(),
  col: z.number().optional(),
  row: z.number().optional(),
  interval: z.number().optional(),
  offset: z.number().optional(),
  urls: z.array(z.string()).optional(),
  color_transfer: ColorTransferSchema.optional(),
})
type PlayInfo = z.infer<typeof PlayInfoSchema>

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
type RetweetedStatusUser = z.infer<typeof RetweetedStatusUserSchema>

const PlaybackListSchema = z.object({
  meta: MetaSchema,
  play_info: PlayInfoSchema,
})
type PlaybackList = z.infer<typeof PlaybackListSchema>

const RetweetedStatusSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  id: z.number(),
  idstr: z.string(),
  mid: z.string(),
  mblogid: z.string(),
  user: RetweetedStatusUserSchema,
  can_edit: z.boolean(),
  edit_count: z.number(),
  textLength: z.number(),
  source: z.string(),
  favorited: z.boolean(),
  rid: z.string(),
  cardid: z.string(),
  pic_ids: z.array(z.any()),
  geo: z.string(),
  pic_num: z.number(),
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
  mblogtype: z.number(),
  showFeedRepost: z.boolean(),
  showFeedComment: z.boolean(),
  pictureViewerSign: z.boolean(),
  showPictureViewer: z.boolean(),
  rcList: z.array(z.any()),
  content_auth_list: z.array(ContentAuthListSchema),
  mixed_count: z.number(),
  is_show_mixed: z.boolean(),
  isSinglePayAudio: z.boolean(),
  text: z.string(),
  text_raw: z.string(),
  region_name: z.string(),
})
export type RawRetweetedStatus = z.infer<typeof RetweetedStatusSchema>

const MediaInfoSchema = z.object({
  name: z.string().optional(),
  stream_url: z.string(),
  stream_url_hd: z.string().optional(),
  format: z.string().optional(),
  h5_url: z.string().optional(),
  mp4_sd_url: z.string().optional(),
  mp4_hd_url: z.string().optional(),
  h265_mp4_hd: z.string().optional(),
  h265_mp4_ld: z.string().optional(),
  inch_4_mp4_hd: z.string().optional(),
  inch_5_mp4_hd: z.string().optional(),
  inch_5_5_mp4_hd: z.string().optional(),
  mp4_720p_mp4: z.string().optional(),
  hevc_mp4_720p: z.string().optional(),
  prefetch_type: z.number().optional(),
  prefetch_size: z.number().optional(),
  act_status: z.number().optional(),
  protocol: MediaInfoProtocolSchema.optional(),
  media_id: z.string().optional(),
  origin_total_bitrate: z.number().optional(),
  video_orientation: VideoOrientationSchema.optional(),
  duration: z.number().optional(),
  forward_strategy: z.number().optional(),
  search_scheme: SearchSchemeSchema.optional(),
  is_short_video: z.number().optional(),
  vote_is_show: z.number().optional(),
  belong_collection: z.number().optional(),
  titles_display_time: z.string().optional(),
  show_progress_bar: z.number().optional(),
  show_mute_button: z.boolean().optional(),
  ext_info: ExtInfoSchema.optional(),
  next_title: z.string().optional(),
  kol_title: z.string().optional(),
  play_completion_actions: z.array(PlayCompletionActionSchema).optional(),
  video_publish_time: z.number().optional(),
  play_loop_type: z.number().optional(),
  author_mid: z.string().optional(),
  author_name: z.string().optional(),
  extra_info: ExtraInfoSchema.optional(),
  video_download_strategy: VideoDownloadStrategySchema.optional(),
  jump_to: z.number().optional(),
  big_pic_info: BigPicInfoSchema.optional(),
  online_users: z.string().optional(),
  online_users_number: z.number().optional(),
  ttl: z.number().optional(),
  storage_type: StorageTypeSchema.optional(),
  is_keep_current_mblog: z.number(),
  playback_list: z.array(PlaybackListSchema).optional(),
  author_info: AuthorInfoSchema.optional(),
  open_scheme: z.string().optional(),
  live_start_time: z.number().optional(),
  live_replay_counts: z.number().optional(),
  real_chatroom_users: z.number().optional(),
  prevue_number: z.number().optional(),
  live_id: z.string().optional(),
  live_status: z.number().optional(),
  real_status: z.number().optional(),
  replay_ld: z.string().optional(),
  replay_hd: z.string().optional(),
  live_ld: z.string().optional(),
  watch_limit: z.number().optional(),
  create_source: z.number().optional(),
  busi_code: z.array(z.string()).optional(),
  subscribe: SubscribeSchema.optional(),
  video_title: z.string().optional(),
})
type MediaInfo = z.infer<typeof MediaInfoSchema>

const PageInfoSchema = z.object({
  type: z.string(),
  page_id: z.string(),
  object_type: z.number(),
  object_id: z.string(),
  content1: z.string(),
  content2: z.string(),
  act_status: z.number().optional(),
  media_info: MediaInfoSchema.optional(),
  page_pic: z.string(),
  page_title: z.string(),
  page_url: z.string(),
  pic_info: PageInfoPicInfoSchema,
  oid: z.union([z.number(), z.string()]),
  type_icon: z.string(),
  author_id: z.union([z.number(), z.string()]),
  authorid: z.union([z.number(), z.string()]),
  warn: z.string().optional(),
  actionlog: PageInfoActionlogSchema,
  short_url: z.string().optional(),
  page_desc: z.string().optional(),
  status: z.string().optional(),
  live: LiveSchema.optional(),
  author: AuthorSchema.optional(),
  live_card_version: z.string().optional(),
  sub_status: z.number().optional(),
  watch_limit: z.number().optional(),
  content3: z.string().optional(),
  preload: z.boolean().optional(),
  content4: z.string().optional(),
  user: PageInfoUserSchema.optional(),
  source_type: ObjectTypeSchema.optional(),
  button_type: z.string().optional(),
  button_follow_uid: z.string().optional(),
  need_lmid: z.string().optional(),
  show_button: z.number().optional(),
  transition_pics: z.array(TransitionPicSchema).optional(),
  alpha_time: z.string().optional(),
  pause_time: z.string().optional(),
  buttons: z.array(ButtonSchema).optional(),
})
type PageInfo = z.infer<typeof PageInfoSchema>

const RawPostSchema = z.object({
  visible: VisibleSchema,
  created_at: z.string(),
  id: z.number(),
  idstr: z.string(),
  mid: z.string(),
  mblogid: z.string(),
  user: RetweetedStatusUserSchema,
  can_edit: z.boolean(),
  textLength: z.number().optional(),
  annotations: z.array(z.union([z.array(z.any()), AnnotationClassSchema])).optional(),
  source: z.string(),
  favorited: z.boolean(),
  rid: z.string(),
  cardid: z.string(),
  pic_ids: z.array(z.string()),
  pic_num: z.number(),
  is_paid: z.boolean(),
  pic_bg_new: z.string(),
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
  share_repost_type: z.number(),
  topic_struct: z.array(TopicStructSchema),
  url_struct: z.array(UrlStructSchema).optional(),
  mblogtype: z.number(),
  showFeedRepost: z.boolean(),
  showFeedComment: z.boolean(),
  pictureViewerSign: z.boolean(),
  showPictureViewer: z.boolean(),
  rcList: z.array(z.any()),
  can_remark: z.boolean().optional(),
  analysis_extra: z.string(),
  readtimetype: ReadtimetypeSchema,
  mixed_count: z.number(),
  is_show_mixed: z.boolean(),
  isSinglePayAudio: z.boolean(),
  text: z.string(),
  text_raw: z.string(),
  page_info: PageInfoSchema.optional(),
  pic_focus_point: z.array(PicFocusPointSchema).optional(),
  pic_infos: z.record(z.string(), PicInfoValueSchema).optional(),
  edit_count: z.number().optional(),
  content_auth_list: z.array(ContentAuthListSchema).optional(),
  repost_type: z.number().optional(),
  region_name: z.string(),
  mix_media_info: MixMediaInfoSchema.optional(),
  retweeted_status: RetweetedStatusSchema.optional(),
})

export type RawPost = z.infer<typeof RawPostSchema>

const RawPostsTimelineSchema = z.object({
  since_id: z.string(),
  list: z.array(RawPostSchema),
  status_visible: z.number(),
  bottom_tips_visible: z.boolean(),
  bottom_tips_text: z.string(),
  topicList: z.array(z.any()),
  total: z.number(),
})
export type RawPostsTimeline = z.infer<typeof RawPostsTimelineSchema>
