import { z } from 'zod'

const RawUserDetailSchema = z.object({
  sunshine_credit: z.object({ level: z.string() }),
  birthday: z.string(),
  created_at: z.string(),
  description: z.string(),
  gender: z.string(),
  location: z.string(),
  real_name: z.object({ name: z.string(), career: z.string() }),
  career: z.object({ company: z.string() }),
  company: z.string(),
  followers: z.object({
    total_number: z.number(),
    users: z.array(
      z.object({
        screen_name: z.string(),
        avatar_large: z.string(),
        id: z.number(),
      }),
    ),
  }),
  label_desc: z.array(
    z.object({
      name: z.string(),
      normal_mode: z.object({
        word_color: z.string(),
        background_color: z.string(),
      }),
      dark_mode: z.object({
        word_color: z.string(),
        background_color: z.string(),
      }),
      scheme_url: z.string(),
    }),
  ),
  desc_text: z.string(),
  verified_url: z.string(),
  friend_info: z.string(),
  companyVerified: z.object({
    licenseCode: z.string(),
    serviceType: z.string(),
    realName: z.string(),
  }),
  links: z.array(z.object({ url: z.string(), title: z.string() })),
})

export type RawUserDetail = z.infer<typeof RawUserDetailSchema>
