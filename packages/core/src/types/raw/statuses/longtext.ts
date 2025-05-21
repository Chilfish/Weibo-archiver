import * as z from 'zod'

const ActionlogSchema = z.object({
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
 type Actionlog = z.infer<typeof ActionlogSchema>

const TopicStructSchema = z.object({
  title: z.string(),
  topic_url: z.string(),
  topic_title: z.string(),
  actionlog: ActionlogSchema,
})
 type TopicStruct = z.infer<typeof TopicStructSchema>

const RawLongTextSchema = z.object({
  longTextContent: z.string(),
  topic_struct: z.array(TopicStructSchema),
  url_struct: z.array(z.any()),
})

export type RawLongText = z.infer<typeof RawLongTextSchema>
