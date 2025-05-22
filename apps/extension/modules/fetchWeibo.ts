import type { FetchConfig } from '@weibo-archiver/core'
import { FetchService, PostService, UserService } from '@weibo-archiver/core/src/services'

interface FetchState {
  status: 'idle' | 'running' | 'finish'
  fetchType: 'weibo' | 'followings' | 'favorites'
}

interface Config extends FetchConfig {
  cookie: string
}

export class FetchManager {
  private fetchService = new FetchService()
  private userService = new UserService(this.fetchService)
  private postService = new PostService(this.userService, this.fetchService)

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

  async fetchUser(uid: string) {
    const user = await this.userService.getDetail(uid)
    console.log({ user })
  }

  async startFetch(uid: string) {
    this.fetchState.status = 'running'

    this.userService.uid = uid
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
      hasWeibo,
      hasFollowings,
      hasFavorites,
    } = this.config

    if (hasWeibo) {
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

    if (hasFollowings) {
      this.fetchState.fetchType = 'followings'
      const followings = await this.userService.getFollowings(uid)
    }

    if (hasFavorites) {
      this.fetchState.fetchType = 'favorites'
      const favorites = await this.postService.getFavorites()
    }

    this.fetchState.status = 'finish'
  }
}
