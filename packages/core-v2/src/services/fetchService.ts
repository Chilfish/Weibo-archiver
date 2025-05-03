import type {
  FetchArgs,
  RawComment,
  RawComments,
  RawLongText,
  RawPostsTimeline,
  RawSearchUser,
  RawUserDetail,
  RawUserInfo,
} from '../types'
import type { Fetcher } from '../utils'
import { FETCH_PATH } from '../constants'
import { createFetcher } from '../utils'

export class FetchService {
  fetcher: Fetcher

  constructor(
    cookies?: string,
  ) {
    this.fetcher = createFetcher({
      headers: {
        Cookie: cookies,
      },
    })
  }

  async userInfo(uid: string): Promise<RawUserInfo> {
    const { data } = await this.fetcher<RawUserInfo, FetchArgs['profile']>(
      FETCH_PATH.PROFILE,
      {
        uid,
      },
    )
    return data
  }

  async userDetail(uid: string): Promise<RawUserDetail> {
    const { data } = await this.fetcher<RawUserDetail, FetchArgs['profileDetail']>(
      FETCH_PATH.PROFILE_DETAIL,
      {
        uid,
      },
    )
    return data
  }

  async searchUser(keyword: string): Promise<RawSearchUser> {
    const { data } = await this.fetcher<RawSearchUser, FetchArgs['searchUser']>(
      FETCH_PATH.SEARCH,
      {
        q: keyword,
      },
    )
    return data
  }

  async longText(postMBlogId: string): Promise<RawLongText> {
    const { data } = await this.fetcher<RawLongText, FetchArgs['postLongText']>(
      FETCH_PATH.POST_LONGTEXT,
      {
        id: postMBlogId,
      },
    )

    return data
  }

  async postsByRange(args: FetchArgs['postRange']): Promise<RawPostsTimeline> {
    const { data } = await this.fetcher<RawPostsTimeline, FetchArgs['postRange']>(
      FETCH_PATH.POSTS_RANGE,
      args,
    )

    return data
  }

  async postsAll(args: FetchArgs['postAll']): Promise<RawPostsTimeline> {
    const { data } = await this.fetcher<RawPostsTimeline, FetchArgs['postAll']>(
      FETCH_PATH.POSTS_ALL,
      args,
    )

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

    return data
  }
}
