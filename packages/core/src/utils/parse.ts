import type {
  CardInfo,
  Comment,
  FetchOptions,
  ParseResult,
  PicInfo,
  Post,
} from '@types'
import { fetchComments, fetchLongText } from '../services'
import { getOptions } from '.'

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a href="${url}">${text}</a>`

/**
 * 解析正文，例如 @user => link(user, userUrl)
 */
export function parseText(text?: string) {
  if (!text) {
    return {
      text: '',
      textImg: null,
    }
  }

  let parsed = text
    .replace(
      /<a[^>]*>(@[^<]+)<\/a>/g, // @用户
      (_, user) => link(`${user}`, `${weibo}/n/${user.replace('@', '')}`),
    )
    .replace(/<img[^>]+alt="([^"]*)"[^>]*>/gm, (_, alt) => alt) // 表情图片
    .replace(/<img[^>]*>/gm, '') // 图标
    .replace(/(https:)?\/\/weibo.cn\/sinaurl\?u=(.+)/, (_, __, href) => decodeURIComponent(href)) // 去掉微博的链接跳转

  const retweetImg = /<a[^>]*href="([^"]*)"[^>]*>查看图片<\/a>/gm.exec(parsed)
  let textImg = null

  if (retweetImg && retweetImg[1]) {
    textImg = retweetImg[1]

    parsed = parsed.replace(retweetImg[0], `[img://${textImg}]`)
  }

  return {
    text: parsed,
    textImg,
  }
}

/**
 * 提取原图链接
 */
export function parseImg(
  size: string,
  pic_ids?: string[],
  img_infos?: Record<string, PicInfo>,
) {
  if (!pic_ids || !img_infos)
    return []

  try {
    return pic_ids.map(id => img_infos[id][size].url)
  }
  catch (e) {
    console.log(`提取图片链接失败 ${e}`)
    return []
  }
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
export function filterComments(
  comments?: any[],
  imgSize = 'large',
): Comment[] {
  if (!comments || !comments.length || !comments[0]?.id)
    return []

  return comments.map((comment) => {
    try {
      const { text } = parseText(comment.text) // 评论区就没见过折叠长文本

      let img = ''
      if (comment.url_struct) {
        comment.url_struct.forEach((item: any) => {
          if (item.pic_ids) {
            const { pic_ids, pic_infos } = item
            img = parseImg(imgSize, pic_ids, pic_infos)[0]
          }
        })
      }

      const res: Comment = {
        id: comment.idstr,
        text,
        img,
        created_at: comment.created_at,
        user: {
          id: comment.user?.idstr,
          screen_name: comment.user?.screen_name,
          profile_image_url: comment.user?.profile_image_url,
        },
        region_name: comment.source,
        like_count: comment.like_counts,
        comments_count: comment.total_number,
      }
      return res
    }
    catch (e) {
      console.log(`数据解析失败, id: ${comment.id}, ${e}`)
      return null
    }
  })
    .filter(Boolean) as Comment[]
}

export async function postFilter(
  post: any,
  options: FetchOptions,
  isRepost = false,
): Promise<Post | undefined> {
  if (!post || !post.id || (!options.repost && !!post.retweeted_status?.id))
    return undefined

  const includeImgs = !isRepost || (isRepost && options.repostPic)
  const imgSize = options.picLarge ? 'largest' : 'large'

  // 转发的微博不需要评论
  const includeComments = !isRepost && options.comment

  try {
    const { text, textImg } = await fetchLongText(post)
    const imgs = includeImgs ? parseImg(imgSize, post.pic_ids, post.pic_infos) : []

    textImg && imgs.push(textImg)

    const res: Post = {
      id: post.id,
      text,
      imgs,
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
      mblogid: post.mblogid,
      detail_url: `${weibo}/${post.user?.id}/${post.mblogid}`,
      retweeted_status: await postFilter(post.retweeted_status, options, true),
      card: parseCard(post.url_struct, post.page_info),
      comments: includeComments ? await fetchComments(post) : [],
    }

    return res
  }
  catch (e) {
    console.log(e, `数据解析失败  ${post.user}, ${post.text}`)
    return undefined
  }
}

export async function postsParser(posts: any[]): Promise<Post[]> {
  const options = await getOptions()

  const res = await Promise.all(
    posts.map(async post => await postFilter(post, options)),
  )

  return res.filter((e): e is Post => !!e && e.user?.id === options.uid)
}

export function imgsParser(posts: Post[]): Set<string> {
  const imgs = posts
    .map((post) => {
      return [
        post.imgs,
        post.retweeted_status?.imgs,
        post.comments.map(e => e.img),
        post.user?.profile_image_url,
        post.card?.img,
      ].flat()
    })
    .flat()
    .filter(Boolean) as string[]

  return new Set(imgs)
}

export async function parsedData(posts: Post[]): Promise<ParseResult> {
  const parsedPosts = await postsParser(posts)
  const imgs = imgsParser(parsedPosts)

  return {
    posts: parsedPosts,
    imgs,
  }
}
