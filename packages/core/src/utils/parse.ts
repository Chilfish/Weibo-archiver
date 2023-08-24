import type { PicInfo, Post } from '@core/types'

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a href="${url}" target="_blank">${text}</a>`

/**
 * 解析正文，例如 @user => link(user, userUrl)
 */
export function parseText(text: string) {
  const url = `${weibo}/n/`
  const reg = /@([^:，\s]+)/g
  return text.replace(reg, (_, user) => link(`@${user}`, url + user))
}

export function parseImg(pic_ids?: string[], img_infos?: Record<string, PicInfo>) {
  if (!pic_ids || !img_infos)
    return []
  const imgs = pic_ids.map(id => img_infos[id].largest.url)
  usePostStore().addImgs(new Set(imgs))
  return imgs
}

/**
 * 数据清洗
 */
export function filterPosts(posts?: any[]): Post[] {
  if (!posts || !posts.length || !posts[0]?.id)
    return []
  return posts.map((post) => {
    try {
      const res: Post = {
        id: post.id,
        text: post.text_raw,
        imgs: parseImg(post.pic_ids, post.pic_infos),
        reposts_count: post.reposts_count,
        comments_count: post.comments_count,
        attitudes_count: post.attitudes_count,
        created_at: post.created_at,
        user: {
          id: post.user?.idstr,
          screen_name: post.user?.screen_name,
          profile_image_url: post.user?.profile_image_url,
        },
        source: post.source,
        region_name: post.region_name,
        isLongText: post.isLongText,
        mblogid: post.mblogid,
        retweeted_status: filterPosts([post.retweeted_status])[0],
      }
      usePostStore().addImgs([res.user.profile_image_url])
      return res
    }
    catch (e) {
      console.log(e, post)
      return null
    }
  }).filter((e): e is Post => !!e)
}
