import type {
  Favorite,
  FetchConfig,
  Following,
  Post,
  UserInfo,
} from '@weibo-archiver/core'
import {
  FetchService,
  PostService,
  UserService,
} from '@weibo-archiver/core/src/services'

interface FetchState {
  status: 'idle' | 'running' | 'finish'
  fetchType: 'weibo' | 'followings' | 'favorites'
}

interface Config extends FetchConfig {
  cookie: string
}

export class FetchManager {
  fetchService = new FetchService()
  userService = new UserService(this.fetchService)
  postService = new PostService(this.userService, this.fetchService)

  fetchState: FetchState = {
    status: 'idle',
    fetchType: 'weibo',
  }

  fetchCount = {
    posts: 0,
    followings: 0,
    favorites: 0,
  }

  curUid = ''

  constructor(
    public config: Config,
  ) {
    this.setCookie(config.cookie)
  }

  setCookie(cookie: string) {
    this.fetchService.setFetcher(cookie)
  }

  async getCurCookieUid() {
    const data = await this.fetchService.userDetail('')
    const re = /uid=(\d+)/
    const [_, result] = data.verified_url.match(re) || []

    if (result) {
      this.curUid = result
    }
    console.log('curUid', result)
    return this.curUid
  }

  async fetchUser(uid: string): Promise<UserInfo> {
    return await this.userService.getDetail(uid)
  }

  async fetchAllWeibo(args: {
    uid: string
    onFetch: (args: {
      posts: Post[]
      page: number
      sinceId: string
    }) => any
  }) {
    const {
      isFetchAll,
      startAt,
      endAt,
      sinceId,
      curPage,
      hasRepost,
      hasComment,
      commentCount,
      repostPic,
    } = this.config

    this.fetchState.fetchType = 'weibo'
    this.userService.uid = args.uid
    await this.postService.getAllPosts({
      isFetchAll,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      sinceId,
      page: curPage,
      hasret: hasRepost ? '1' : '0',
      hasRepostPic: repostPic,
      commentsCount: hasComment ? commentCount : 0,
      onFetched: async ({ posts, page, sinceId }) => {
        const filtered = posts
          .filter((post) => {
            if (hasRepost)
              return true
            return !!post.retweet?.mblogid
          })
        this.fetchCount.posts += filtered.length
        await args.onFetch({
          posts: filtered,
          page,
          sinceId: sinceId || '',
        })
      },
    })
  }

  async fetchFollowings(uid: string) {
    this.fetchState.fetchType = 'followings'
    this.userService.uid = uid

    let page = 1
    const data = new Set<Following>()
    while (true) {
      const followings = await this.userService.getFollowings({
        page,
        uid,
        isMe: uid === this.curUid,
      })
      page += 1
      followings.forEach(user => data.add(user))
      if (followings.length < 1) {
        break
      }
    }
    return Array.from(data)
  }

  async fetchFavorites(args: {
    onFetch: (posts: Favorite[]) => any
  }) {
    this.fetchState.fetchType = 'favorites'
    return await this.postService.getFavorites(args)
  }

  async fetchNewPosts(args: {
    uid: string
    newestPostDate: number
    onFetch: (count: number) => any
  }): Promise<Post[]> {
    let page = 0
    let isOutDate = false
    const allPosts: Post[] = []
    this.postService.sinceId = ''
    this.userService.uid = args.uid

    while (true) {
      const posts = (await this.postService.getPostsBySinceId({
        uid: args.uid,
        page,
        commentsCount: 20,
      }))
        .filter((post) => {
          if (page < 1) {
            return true
          }
          isOutDate = new Date(post.createdAt).getTime() <= args.newestPostDate
          return !isOutDate
        })

      allPosts.push(...posts)
      page += 1

      await args.onFetch(allPosts.length)

      if (posts.length < 1 || isOutDate) {
        break
      }
    }

    return allPosts
  }

  async searchUser(keyword: string): Promise<UserInfo[]> {
    const isUid = /^\d+$/.test(keyword)

    return isUid
      ? await this.userService.getDetail(keyword).then(user => [user])
      : await this.userService.searchUser(keyword)
  }
}
