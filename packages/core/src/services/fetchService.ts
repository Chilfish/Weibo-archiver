import type {
  FetchArgs,
  RawComment,
  RawComments,
  RawFavorite,
  RawFavoriteList,
  RawFollowings,
  RawLongText,
  RawMyFollowings,
  RawPostsTimeline,
  RawSearchUser,
  RawUserDetail,
  RawUserInfo,
} from '../types'
import type { Fetcher } from '../utils/fetch'
import { FETCH_PATH } from '../constants'
import { createFetcher } from '../utils/fetch'

export class FetchService {
  fetcher: Fetcher

  onRawFetch: (args: { data: any, type: string }) => any = () => {}
  onBeforeFetch: (path: string) => any = () => {}

  constructor(
    cookies?: string,
  ) {
    this.fetcher = this.setFetcher(cookies || '')
  }

  async userInfo(uid: string): Promise<RawUserInfo> {
    const { data } = await this.fetcher<RawUserInfo, FetchArgs['profile']>(
      FETCH_PATH.PROFILE,
      {
        uid,
      },
    )

    await this.onRawFetch({ data, type: FETCH_PATH.PROFILE })
    return data
  }

  async userDetail(uid: string): Promise<RawUserDetail> {
    const { data } = await this.fetcher<RawUserDetail, FetchArgs['profileDetail']>(
      FETCH_PATH.PROFILE_DETAIL,
      {
        uid,
      },
    )

    await this.onRawFetch({ data, type: FETCH_PATH.PROFILE_DETAIL })
    return data
  }

  /**
   * 有可能报错提示：博主设置仅针对粉丝展示全部关注
   */
  async userFollowings(args: FetchArgs['userFollowings']): Promise<RawFollowings> {
    const { data } = await this.fetcher<RawFollowings, FetchArgs['userFollowings']>(
      FETCH_PATH.FOLLOWINGS,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.FOLLOWINGS })
    return data
  }

  async myFollowings(args: FetchArgs['myFollowings']): Promise<RawMyFollowings> {
    const { data } = await this.fetcher<RawMyFollowings, FetchArgs['myFollowings']>(
      FETCH_PATH.FOLLOWINGS,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.FOLLOWINGS })
    return data
  }

  async searchUser(keyword: string): Promise<RawSearchUser> {
    const { data } = await this.fetcher<RawSearchUser, FetchArgs['searchUser']>(
      FETCH_PATH.SEARCH,
      {
        q: keyword,
      },
    )

    await this.onRawFetch({ data, type: FETCH_PATH.SEARCH })
    return data
  }

  async longText(postMBlogId: string): Promise<RawLongText> {
    const { data } = await this.fetcher<RawLongText, FetchArgs['postLongText']>(
      FETCH_PATH.POST_LONGTEXT,
      {
        id: postMBlogId,
      },
    )

    await this.onRawFetch({ data, type: FETCH_PATH.POST_LONGTEXT })
    return data
  }

  async postsByDate(args: FetchArgs['postRange']): Promise<RawPostsTimeline> {
    const { data } = await this.fetcher<RawPostsTimeline, FetchArgs['postRange']>(
      FETCH_PATH.POSTS_RANGE,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.POSTS_RANGE })
    return data
  }

  async postsBySinceId(args: FetchArgs['postAll']): Promise<RawPostsTimeline> {
    const { data } = await this.fetcher<RawPostsTimeline, FetchArgs['postAll']>(
      FETCH_PATH.POSTS_ALL,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.POSTS_ALL })
    return data
  }

  /**
   * 关于 is_show_bulletin 和热评问题见#17
   * @see https://github.com/Chilfish/Weibo-archiver/issues/17
   */
  async comments(args: FetchArgs['postComments']): Promise<RawComment[]> {
    const { data } = await this.fetcher<RawComments['data'], FetchArgs['postComments']>(
      FETCH_PATH.POST_COMMENTS,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.POST_COMMENTS })
    return data
  }

  async favorites(args: FetchArgs['favorites']): Promise<RawFavorite[]> {
    const { data } = await this.fetcher<RawFavoriteList, FetchArgs['favorites']>(
      FETCH_PATH.FAVORITES,
      args,
    )

    await this.onRawFetch({ data, type: FETCH_PATH.FAVORITES })
    return data.status
  }

  setFetcher(cookies: string) {
    this.fetcher = createFetcher({
      headers: {
        Cookie: cookies || undefined,
      },
      beforeFetch: this.onBeforeFetch,
    })
    return this.fetcher
  }
}
