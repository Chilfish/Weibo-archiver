import type { Comment, Favorite, Post } from '../types'
import type { FetchArgs } from '../types/fetchArgs'
import type { RawPostsTimeline } from '../types/raw'
import type { FetchService } from './fetchService'
import type { UserService } from './userService'
import { PQueue } from '../utils/pqueue'
import { PostParser, WeiboParser } from './parseService'

type OnFetched = (data: {
  posts: Post[]
  page: number
  postsTotal: number
  fetchedCount: number
  sinceId?: string
}) => any

export class PostService {
  private sinceId: string = ''
  private fetchedCount: number = 0
  private postsTotal: number = 0
  private pqueue = new PQueue({ concurrency: 3 })

  onError = (data: {
    data: any
    postsTotal: number
    sinceId?: string
  }): any => data

  constructor(
    private userService: UserService,
    private fetchService: FetchService,
  ) {

  }

  get uid() {
    return this.userService.uid
  }

  get total() {
    return this.fetchedCount
  }

  async getAllPosts(args: FetchArgs['posts'] & {
    onFetched: OnFetched
  }): Promise<void> {
    const {
      isFetchAll = true,
      endAt = '2000-01-01',
      sinceId = this.sinceId,
      page = 0,
      startAt,
      commentsCount,
      onFetched,
      ...restArgs
    } = args

    console.log(args)

    if (isFetchAll) {
      // 这种方法在第60页就返回空了，需要转到下一个窗口
      // 但实际上微博官方返回的接口不全，漏了非常多

      // return this.getAllRangePosts({
      //   startAt: new Date('2000-01-01'),
      //   endAt: new Date(),
      //   page,
      //   commentsCount,
      //   onFetched,
      //   ...restArgs,
      // })

      return this.getAllPostsBySinceId({
        since_id: sinceId,
        page,
        commentsCount,
        onFetched,
        ...restArgs,
      })
    }

    if (!startAt) {
      throw new Error('startAt is required when isFetchAll is false')
    }
    return this.getAllPostsByDate({
      startAt,
      endAt,
      page,
      commentsCount,
      onFetched,
      ...restArgs,
    })
  }

  async getAllPostsBySinceId(args: Omit<FetchArgs['postAll'], 'feature' | 'uid'> & {
    commentsCount: number
    onFetched: OnFetched
  }): Promise<void> {
    let page = args?.page || 1

    while (true) {
      const posts = await this.getPostsBySinceId({
        ...args,
        page,
      })

      await args.onFetched({
        posts,
        page: args.page,
        sinceId: this.sinceId,
        fetchedCount: this.fetchedCount,
        postsTotal: this.postsTotal,
      })
      await new Promise(r => setTimeout(r, 1000))

      page++
      if (this.fetchedCount >= this.postsTotal || posts.length === 0) {
        break
      }
    }
  }

  async getAllPostsByDate(
    args: Omit<FetchArgs['postRange'], 'uid' | 'starttime' | 'endtime'> & {
      startAt: Date | string
      endAt: Date | string
      commentsCount?: number
      onFetched?: OnFetched
    },
  ): Promise<void> {
    const startAt = new Date(args.startAt)
    const endAt = new Date(args.endAt)
    startAt.setHours(0, 0, 0, 0)
    endAt.setHours(23, 59, 0, 0)

    const starttime = startAt.getTime() / 1000
    let endtime = endAt.getTime() / 1000

    let page = args.page || 1
    let lastPostDate = new Date()

    while (true) {
      const posts = await this.getPostsByDate({
        ...args,
        starttime,
        endtime,
        page,
        uid: this.uid,
      })

      await args.onFetched?.({
        page,
        posts,
        fetchedCount: this.fetchedCount,
        postsTotal: this.postsTotal,
      })

      await new Promise(r => setTimeout(r, 1000))

      page++
      if (posts.at(-1)?.createdAt)
        lastPostDate = new Date(posts.at(-1)!.createdAt)

      if (posts.length === 0) {
        if (this.fetchedCount >= this.postsTotal)
          break

        // 还没获取完，转到下一个窗口
        page = 1
        lastPostDate.setHours(23, 59, 0, 0)
        endtime = lastPostDate.getTime() / 1000
      }
    }
  }

  async getLongText(postMBlogId: string): Promise<string | undefined> {
    try {
      const data = await this.fetchService.longText(postMBlogId)

      if (!data.longTextContent) {
        return undefined
      }

      return PostParser.parseText(data.longTextContent, data.url_struct)
    }
    catch (e) {
      console.error(`[get long text]: ${postMBlogId}, ${e}`)
      return undefined
    }
  }

  async getPostsByDate(args: FetchArgs['postRange'] & {
    commentsCount?: number
  }): Promise<Post[]> {
    const data = await this.fetchService.postsByDate({
      uid: this.uid,
      hasmuisc: args.hasmuisc || '1',
      haspic: args.haspic || '1',
      hastext: args.hastext || '1',
      hasvideo: args.hasvideo || '1',
      hasori: args.hasori || '1',
      hasret: args.hasret || '1',
      starttime: args.starttime,
      endtime: args.endtime,
      page: args.page || 1,
    })
    await this._setLongText(data.list)

    if (data.total && !this.postsTotal) {
      this.postsTotal = data.total
    }

    const posts = WeiboParser.parseAll(data.list)
    this.fetchedCount += posts.length

    if (args.commentsCount) {
      await this._setComments(posts, args.commentsCount)
    }
    return posts
  }

  async getComments(
    postId: string,
    isShowBulletIn: '0' | '2' = '2',
    count: number = 20,
  ): Promise<Comment[]> {
    const data = await this.fetchService.comments({
      uid: this.uid,
      id: postId,
      count,
      is_show_bulletin: isShowBulletIn,
      flow: '0',
      fetch_level: 0,
      is_mix: '0',
      is_reload: '1',
      locale: 'zh_CN',
    })

    return data
      .map(PostParser.parseComments)
      .slice(0, count)
  }

  async getFavorites(): Promise<Favorite[]> {
    let page = 1
    const result: Favorite[] = []
    while (true) {
      const data = await this.fetchService.favorites({
        uid: this.uid,
        page,
        with_total: true,
      })

      if (data.length < 1) {
        break
      }

      await this._setLongText(data as any)

      const parsed = WeiboParser.parseBookmarks(data as any[], this.uid)

      result.push(...parsed)
      page += 1
    }

    return result
  }

  async getPostsBySinceId(args: Omit<FetchArgs['postAll'], 'feature' | 'uid'> & {
    commentsCount: number
  }): Promise<Post[]> {
    const data = await this.fetchService.postsBySinceId({
      uid: this.uid,
      since_id: this.sinceId,
      page: args.page || 1,
      feature: 0,
      hasmuisc: args.hasmuisc || '1',
      haspic: args.haspic || '1',
      hastext: args.hastext || '1',
      hasvideo: args.hasvideo || '1',
      hasori: args.hasori || '1',
      hasret: args.hasret || '1',
    })
    await this._setLongText(data.list)
    if (data.since_id) {
      this.sinceId = data.since_id
    }
    if (data.total) {
      this.postsTotal = data.total
    }

    try {
      const posts = WeiboParser.parseAll(data.list)
      this.fetchedCount += posts.length

      if (args.commentsCount) {
        await this._setComments(posts, args.commentsCount)
      }

      return posts
    }
    catch (err) {
      console.error(err)
      // await this.onError({ data, sinceId: this.sinceId, postsTotal: this.postsTotal }).catch()
      return []
    }
  }

  private async _setLongText(rawData: RawPostsTimeline['list']) {
    for (const post of rawData) {
      if (post.isLongText) {
        const longText = await this.getLongText(post.mblogid)
        if (longText)
          post.text_raw = longText
      }
      else if (post.retweeted_status?.isLongText) {
        const longText = await this.getLongText(post.retweeted_status.mblogid)
        if (longText)
          post.retweeted_status.text_raw = longText
      }
    }
  }

  private async _setComments(posts: Post[], commentsCount: number) {
    posts.forEach((post) => {
      if (post.commentsCount < 1)
        return
      this.pqueue.add(() =>
        this.getComments(post.id, post.isShowBulletIn, commentsCount)
          .catch(() => [] as Comment[])
          .then(comments => post.comments = comments),
      )
    })

    await this.pqueue.onIdle()
  }
}
