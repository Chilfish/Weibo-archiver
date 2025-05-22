import type { FetchConfig, UserInfo } from '@weibo-archiver/core'
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

  constructor(
    private config: Config,
  ) {
    this.setCookie(config.cookie)
  }

  setCookie(cookie: string) {
    this.fetchService.setFetcher(cookie)
  }

  async fetchUser(uid: string): Promise<UserInfo> {
    return await this.userService.getDetail(uid)
  }

  async fetchAllWeibo(uid: string) {
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
      },
    })
  }

  async fetchFollowings(uid: string) {
    this.fetchState.fetchType = 'followings'
    const followings = await this.userService.getFollowings(uid)
  }

  async fetchFavorites() {
    this.fetchState.fetchType = 'favorites'
    const favorites = await this.postService.getFavorites()
  }

  async startFetch(uid: string) {
    this.fetchState.status = 'running'
    this.userService.uid = uid

    const {
      hasWeibo,
      hasFollowings,
      hasFavorites,
    } = this.config

    if (hasWeibo) {
      await this.fetchAllWeibo(uid)
    }
    if (hasFollowings) {
      await this.fetchFollowings(uid)
    }
    if (hasFavorites) {
      await this.fetchFavorites()
    }

    this.fetchState.status = 'finish'
  }
}
