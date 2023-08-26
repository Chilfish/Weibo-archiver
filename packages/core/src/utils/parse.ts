import type { CardInfo, Comment, PicInfo, Post } from '@core/types'

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a href="${url}">${text}</a>`

/**
 * 解析正文，例如 @user => link(user, userUrl)
 */
export function parseText(text?: string) {
  if (!text)
    return ''
  let parsed = text
    .replace(
      /<a[^>]*>(@[^<]+)<\/a>/g, // @用户
      (_, user) => link(`${user}`, `${weibo}/n/${user.replace('@', '')}`),
    )
    .replace(/<img[^>]+alt="([^"]*)"[^>]*>/gm, (_, alt) => alt) // 表情图片
    .replace(/<img[^>]*>/gm, '') // 图标

  const retweetImg = /<a[^>]*href="([^"]*)"[^>]*>查看图片<\/a>/gm.exec(parsed)

  if (retweetImg && retweetImg[1]) {
    usePostStore().addImgs([retweetImg[1]])
    const img = retweetImg[1]

    parsed = parsed.replace(retweetImg[0], `[img://${img}]`)
  }

  return parsed
}

/**
 * 将图片的远程 url 替换为本地图片
 * 格式：域名-文件名
 */
export function replaceImg(img: string) {
  if (isInMonkey || img.includes('data:image'))
    return img
  const name = img.split('/').pop()?.replace(/\?.+/, '') // 同时去除 params
  const prefix = img.match(/^(?:https?:\/\/)?([^:\/\n]+)/im)?.[1] // 域名
  return `./assets/img/${prefix}-${name}`
}

/**
 * 提取原图链接
 */
export function parseImg(pic_ids?: string[], img_infos?: Record<string, PicInfo>) {
  if (!pic_ids || !img_infos)
    return []
  const imgs = pic_ids.map(id => img_infos[id].largest.url)
  usePostStore().addImgs(new Set(imgs))
  return imgs
}

/**
 * 解析转发的卡片
 */
function parseCard(url_struct?: any[], card?: any): CardInfo | undefined {
  if (!url_struct || !card)
    return undefined

  const link = url_struct.find((e: any) => e.page_id === card.page_id)?.long_url
  const title = card.page_title === '' ? card.content1 : card.page_title
  let desc = card.content2 === '' ? card.content1 : card.content2

  if (card.object_type === 'video') {
    const viewed = card?.media_info?.online_users
    const title = card?.media_info?.video_title
    desc = `${title} - ${viewed}`
  }

  return {
    link,
    title,
    desc,
    img: card.page_pic,
  }
}

/**
 * 过滤评论区数据
 */
export function filterComments(comments?: any[]): Comment[] {
  if (!comments || !comments.length || !comments[0]?.id)
    return []
  return comments.map((comment) => {
    try {
      const res: Comment = {
        id: comment?.idstr,
        text: parseText(comment?.text), // 评论区就没见过折叠长文本
        img: comment?.url_struct?.[0]?.long_url,
        created_at: comment?.created_at,
        user: {
          id: comment?.user?.idstr,
          screen_name: comment?.user?.screen_name,
          profile_image_url: comment?.user?.profile_image_url,
        },
        region_name: comment?.source,
        like_count: comment?.like_counts,
        comments_count: comment?.total_number,
      }
      return res
    }
    catch (e) {
      console.log(e, comment)
      ElMessage.error(`数据解析失败, id: ${comment.id}, ${comment.text}`)
      return null
    }
  }).filter((e): e is Comment => !!e)
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
        text: post.text, // 不解析，因为有些长文本会被截断
        imgs: parseImg(post.pic_ids, post.pic_infos),
        reposts_count: post.reposts_count,
        comments_count: post.comments_count,
        like_count: post.attitudes_count,
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
        detail_url: `${weibo}/${post?.user?.id}/${post.mblogid}`,
        retweeted_status: filterPosts([post.retweeted_status])[0],
        card: parseCard(post.url_struct, post.page_info),
        comments: filterComments(post.comments),
      }
      const avatar = res.user?.profile_image_url
      usePostStore().addImgs([avatar, res.card?.img])
      return res
    }
    catch (e) {
      console.log(e, post)
      ElMessage.error(`数据解析失败, id: ${post.id}, ${post.text}`)
      return null
    }
  }).filter((e): e is Post => !!e && e.user.id === useUserStore().uid)
}
