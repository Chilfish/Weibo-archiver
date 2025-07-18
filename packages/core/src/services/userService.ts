import type { Following, UserInfo } from '../types'
import type { FetchService } from './fetchService'
import { WeiboError } from '../utils/error'
import { UserParser } from './parseService'

export class UserService {
  private _cookieUid: string = ''

  constructor(
    private fetchService: FetchService,
  ) {
  }

  set cookieUid(uid: string) {
    if (Number.isNaN(Number(uid))) {
      throw new WeiboError('用户 uid 应为纯数字')
    }
    this._cookieUid = uid
  }

  /**
   * 当前 cookie 的 userId
   */
  get cookieUid() {
    if (!this._cookieUid) {
      throw new WeiboError('未设置用户的数字 uid')
    }
    return this._cookieUid
  }

  async getDetail(uid?: string): Promise<UserInfo> {
    const detailInfo = await this.fetchService.userDetail(uid || this.cookieUid)
    const baseInfo = await this.fetchService.userInfo(uid || this.cookieUid)

    const userInfo = UserParser.parse(baseInfo.user)

    return {
      ...userInfo,
      createdAt: detailInfo.created_at,
      birthday: detailInfo.birthday,
    }
  }

  async searchUser(keyword: string): Promise<UserInfo[]> {
    const data = await this.fetchService.searchUser(keyword)

    return data.users.map(UserParser.parse)
  }

  async getFollowings(args: {
    uid: string
    page: number
    isMe?: boolean
    onFetch?: (args: { data: Following[], page: number }) => any
  }): Promise<Following[]> {
    const { page, uid } = args

    // const fetchFn = isMe
    //   ? this.fetchService.myFollowings.bind(this.fetchService)
    //   : this.fetchService.userFollowings.bind(this.fetchService)

    const fetchFn = this.fetchService.userFollowings.bind(this.fetchService)

    const data = await fetchFn({
      page,
      uid,
    }).catch((err) => {
      console.error(err)
      return {
        users: [],
        next_cursor: undefined,
      }
    })

    if (!data?.next_cursor) {
      return []
    }

    const users = data.users.map(user => UserParser.parseFollowing(user))

    await args.onFetch?.({ data: users, page })

    return users
  }

  async getAllFollowings(args: {
    uid: string
    onFetch?: (args: { data: Following[], page: number }) => any
  }): Promise<Following[]> {
    let page = 0
    const users: Following[] = []

    while (true) {
      const _users = await this.getFollowings({
        ...args,
        page,
      })

      users.push(..._users)
      page += 1

      if (_users.length === 0) {
        break
      }
    }

    return users
  }

  // async getMyFollowings(page: number): Promise<Following[]> {
  //   const data = await this.fetchService.myFollowings({ page })
  //   const users = data.users
  //
  //   return users.map(UserParser.parseFollowing)
  // }
}
