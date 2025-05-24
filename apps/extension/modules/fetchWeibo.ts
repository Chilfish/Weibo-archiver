import type { FetchConfig, Following, UserInfo } from '@weibo-archiver/core'
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
    private config: Config,
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
