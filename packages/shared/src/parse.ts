import type {
  CardInfo,
  Comment,
  FetchOptions,
  PicInfo,
  Post,
  UserBio,
} from './types'
import PQueue from 'p-queue'
import { delay } from '.'
import { fetchComments, fetchLongText } from './services'

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a target="_blank" href="${url}">${text}</a>`

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
    .replace(/<img[^>]+alt="([^"]*)"[^>]*>/g, (_, alt) => alt) // 表情图片
    .replace(/<img[^>]*>/g, '') // 图标
    .replace(/(https:)?\/\/weibo.cn\/sinaurl\?u=(.+)/, (_, __, href) => decodeURIComponent(href)) // 去掉微博的链接跳转

  const retweetImg = /<a[^>]*href="([^"]*)"[^>]*>查看图片<\/a>/.exec(parsed)
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
): Comment[] {
  if (!comments || !comments.length || !comments[0]?.id)
    return []

  return comments.map((comment) => {
    try {
      const { text } = parseText(comment.text) // 评论区就没见过折叠长文本

      let img = ''
      if (comment.url_struct) {
        comment.url_struct.forEach((item: any) => {
          if (item.pic_ids && item.url_title === '查看图片') {
            const { pic_ids, pic_infos } = item
            img = parseImg('large', pic_ids, pic_infos)[0]
          }
        })
      }

      const res: Comment = {
        id: comment.idstr,
        text,
        img,
        created_at: comment.created_at,
        user: {
          uid: comment.user?.idstr || comment.user?.id,
          name: comment.user?.screen_name,
          avatar: comment.user?.profile_image_url,
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
    .filter((e): e is Comment => !!e)
    .sort((a, b) => {
      const aCount = a.comments_count + a.like_count
      const bCount = b.comments_count + b.like_count
      return bCount - aCount
    })
}

/**
 * 解析关注列表
 */
export function parseFollowing(user: any) {
  return {
    uid: user.id,
    name: user.screen_name,
    avatar: user.profile_image_url,
    bio: user.description,
    remark: user.remark || undefined,
  } as UserBio
}

/**
 * 将数据转换为 Post 类型
 */
export function parseOldPost(
  post: any,
): Post {
  const repost = post.retweeted_status

  if (repost) {
    repost.user = {
      uid: repost.user.id,
      name: repost.user.screen_name,
      avatar: repost.user.profile_image_url,
    }
  }

  return {
    ...post,
    user: undefined,
    retweeted_status: repost,
    comments: filterComments(post.comments),
  }
}

/**
 * 从返回的 api 中提取信息
 * @param post 微博数据
 * @param options 选项
 * @param isRepost 是否是转发，用在递归判断中
 */
export async function postFilter(
  post: any,
  options: FetchOptions,
  isRepost = false,
): Promise<Post | undefined> {
  if (!post || !post.id || (!options.hasRepost && !!post.retweeted_status?.id))
    return undefined

  const includeImgs = !isRepost || (isRepost && options.repostPic)
  const imgSize = options.largePic ? 'largest' : 'large'

  // 转发的微博不需要评论
  const includeComments = !isRepost && options.hasComment && post.comments_count > 0 && post

  try {
    const { text, textImg } = await fetchLongText(post)
    const imgs = includeImgs ? parseImg(imgSize, post.pic_ids, post.pic_infos) : []

    if (textImg)
      imgs.push(textImg)

    const postId = post.id
    const uid = post.user?.idstr || options.uid

    const res: Post = {
      id: post.id,
      text,
      imgs,
      reposts_count: post.reposts_count,
      comments_count: post.comments_count,
      like_count: post.attitudes_count,
      created_at: post.created_at,
      user: isRepost
        ? {
            uid,
            name: post.user?.screen_name,
            avatar: post.user?.profile_image_url,
          }
        : undefined,
      source: post.source,
      region_name: post.region_name,
      mblogid: post.mblogid,
      detail_url: `${weibo}/${post.user?.id}/${post.mblogid}`,
      retweeted_status: await postFilter(post.retweeted_status, options, true),
      card: parseCard(post.url_struct, post.page_info),
      comments: includeComments
        ? await fetchComments(postId, uid, post.is_show_bulletin, options.commentCount)
        : [],
    }

    return res
  }
  catch (e) {
    console.log(e, `数据解析失败  ${post.user}, ${post.text}`)
    return undefined
  }
}

/**
 * 解析微博数据的入口
 */
export async function postsParser(
  posts: any[],
  options: FetchOptions,
  limitConcurrent = true,
): Promise<Post[]> {
  /** 如果包含评论，限制并发数 */
  let concurrency = options.hasComment ? 5 : 10
  if (!limitConcurrent)
    concurrency = 20
  const queue = new PQueue({ concurrency })

  return await Promise.all(
    posts.map(post => queue.add(async () => {
      await delay(3000)
      const res = await postFilter(post, options)
      if (res && options.savePost)
        await options.savePost(res)
      return res
    })),
  ).then(res => res.filter((e): e is Post => !!e))
}

/**
 * 提取所有图片链接
 */
export function imgsParser(posts: Post[]): Set<string> {
  const imgs = posts
    .map((post) => {
      const { textImg } = parseText(post.text)
      return [
        post.imgs,
        post.retweeted_status?.imgs,
        post.comments.map(e => e.img),
        post.card?.img,
        textImg,
      ]
        .filter((e): e is string => !!e)
    })
    .flat()
    .flat()
    .sort()

  return new Set(imgs)
}
