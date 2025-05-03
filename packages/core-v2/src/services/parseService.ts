import type {
  CardInfo,
  Comment,
  Meta,
  Post,
  Retweet,
  User,
  UserBio,
  UserInfo,
} from '../types'
import type {
  RawComment,
  RawPost,
  RawRetweetedStatus,
  RawUrlStruct,
} from '../types/raw'

/**
 * 用户解析器类
 */
export class UserParser {
  static parseFromPost(
    rawPost: RawPost | RawRetweetedStatus | RawComment,
  ): User | undefined {
    const user = rawPost.user

    // 被转发微博不可见时，没有用户信息
    if (!user || !user?.idstr) {
      return undefined
    }

    return {
      uid: user.idstr,
      name: user.screen_name,
      avatar: user.profile_image_url,
    }
  }

  static parse(user: any): UserInfo {
    return {
      uid: user.id.toString(),
      name: user.screen_name,
      avatar: user.avatar_large,
      followers: user.followers_count,
      followings: user.friends_count,
      bio: user.description,
      createdAt: '',
      birthday: '',
    }
  }

  static parseFollowing(user: any) {
    return {
      uid: user.id,
      name: user.screen_name,
      avatar: user.profile_image_url,
      bio: user.description,
      remark: user.remark || undefined,
    } as UserBio
  }
}

export class PostParser {
  static parse(rawPost: RawPost): Post | undefined {
    const mblogid = rawPost.mblogid
    if (!mblogid) {
      console.warn('Skipping post due to missing mblogid:', rawPost)
      return undefined
    }

    let retweeted_status: Retweet | undefined
    const hasRetweeted = 'retweeted_status' in rawPost && rawPost.retweeted_status?.id
    if (hasRetweeted) {
      retweeted_status = PostParser.parseRetweet(rawPost.retweeted_status, rawPost.url_struct || [])
    }

    const meta = PostParser.parseMeta(rawPost)
    const text = PostParser.parseText(rawPost.text_raw, rawPost.url_struct || [])
    const imgs = PostParser.parseImage(rawPost)
    const card = PostParser.parseLinkCard(rawPost)

    const detail_url = `https://weibo.com/detail/${rawPost.idstr}`
    const { reposts_count, comments_count, attitudes_count: like_count } = rawPost

    return {
      ...meta,
      detail_url,
      mblogid,
      text,
      imgs,
      reposts_count,
      comments_count,
      like_count,
      card,
      retweeted_status,
      comments: [],
    }
  }

  static parseRetweet(
    rawPost: RawRetweetedStatus | undefined,
    urlStruct: RawUrlStruct[],
  ): Retweet | undefined {
    const mblogid = rawPost?.mblogid
    if (!mblogid) {
      return undefined
    }

    const meta = PostParser.parseMeta(rawPost)
    const text = PostParser.parseText(rawPost.text_raw, urlStruct)
    const imgs = PostParser.parseImage(rawPost as any)
    const user = UserParser.parseFromPost(rawPost)

    const detail_url = `https://weibo.com/detail/${rawPost.idstr}`
    const { reposts_count, comments_count, attitudes_count: like_count } = rawPost

    return {
      ...meta,
      detail_url,
      mblogid,
      text,
      imgs,
      reposts_count,
      comments_count,
      like_count,
      user,
    }
  }

  static parseMeta(rawPost: RawPost | RawRetweetedStatus): Meta {
    const {
      id,
      region_name,
      created_at,
      source,
    } = rawPost

    return {
      id: Number(id),
      region_name,
      created_at,
      source,
    }
  }

  static parseText(
    rawText: string,
    urlStruct: RawUrlStruct[],
  ): string {
    if (!Array.isArray(urlStruct) || urlStruct.length < 1) {
      return rawText
    }

    const r = /http:\/\/t\.cn\/\S+/g
    const replacedText = rawText.replace(r, (match) => {
      const longUrl = urlStruct.find(url => url.short_url === match)

      if (longUrl?.pic_infos) {
        return Object.values(longUrl.pic_infos)[0]?.woriginal.url || match
      }

      return longUrl?.long_url || match
    })

    if (replacedText.startsWith('sinaweibo://')) {
      const url = new URL(replacedText)
      return url.searchParams.get('url') || replacedText
    }

    return replacedText
  }

  static parseImage(rawPost: RawPost): string[] {
    const imageUrls: string[] = []
    const mixMediaInfo = rawPost.mix_media_info?.items || []
    const picInfos = rawPost.pic_infos || {}

    for (const item of mixMediaInfo) {
      if (item.type === 'pic') {
        const largeUrl = item.data.largest?.url
        if (largeUrl) {
          imageUrls.push(largeUrl)
        }
      }
    }

    for (const img of Object.values(picInfos)) {
      const url = img?.largest.url
      if (url) {
        imageUrls.push(url)
      }
    }

    return imageUrls
  }

  static parseLinkCard(rawPost: RawPost): CardInfo | undefined {
    const rawPageInfo = rawPost.page_info
    if (!rawPageInfo) {
      return undefined
    }

    const link = rawPageInfo.page_url
    const imgUrl = rawPageInfo.page_pic
    const desc = rawPageInfo.page_desc || rawPageInfo.content1 || rawPageInfo.content2

    let title = rawPageInfo.page_title
    let realLink = new URL(link).searchParams.get('url') ?? link

    if (rawPageInfo.media_info?.h5_url) {
      realLink = rawPageInfo.media_info.h5_url
    }

    if (rawPageInfo.object_type === 'article') {
      title += ' 的微博文章'
    }

    return {
      link: realLink,
      title,
      img: imgUrl,
      desc,
    }
  }

  static parseComments(rawComment: RawComment): Comment {
    const urlStruct = rawComment.url_struct || []
    const user = UserParser.parseFromPost(rawComment)!
    const text = PostParser.parseText(rawComment.text_raw, urlStruct)

    const img = urlStruct.map((item) => {
      const url = Object.values(item.pic_infos || {})[0]?.woriginal.url

      return url ?? ''
    }).filter(Boolean).at(0) || ''

    const {
      id,
      total_number: comments_count,
      created_at,
      source: region_name,
      like_counts: like_count,
      floor_number,
    } = rawComment

    return {
      id,
      text,
      img,
      created_at,
      region_name,
      floor_number,
      comments_count,
      like_count,
      user,
    }
  }
}

export class WeiboParser {
  /**
   * 将原始微博API响应解析为Post对象数组
   * @param rawData 微博API的原始JSON对象数组
   * @returns Post对象数组
   */
  static parseAll(rawData: RawPost[]): Post[] {
    const posts: Post[] = []

    for (const rawItem of rawData) {
      try {
        const post = PostParser.parse(rawItem)
        if (post) {
          posts.push(post)
        }
      }
      catch (error) {
        console.error(`[parseAll], ${error}`, rawItem.mblogid)
        throw error
      }
    }

    return posts
  }

  /**
   * 提取所有图片链接
   */
  static parseImgs(posts: Post[]): Set<string> {
    const imgs = posts
      .map((post) => {
        // TODO
        // const { textImg } = PostParser(post.text)
        return [
          post.imgs,
          post.retweeted_status?.imgs,
          post.comments.map(e => e.img),
          post.card?.img,
          // textImg,
        ]
          .filter((e): e is string => !!e)
      })
      .flat()
      .flat()
      .sort()

    return new Set(imgs)
  }
}
