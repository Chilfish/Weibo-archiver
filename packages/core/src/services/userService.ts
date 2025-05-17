import type { UserBio, UserInfo } from '../types'
import type { FetchService } from './fetchService'
import { WeiboError } from '../utils'
import { UserParser } from './parseService'

export class UserService {
  private _uid: string = ''

  constructor(
    private fetchService: FetchService,
    uid?: string,
  ) {
    if (uid) {
      this.uid = uid
    }
  }

  set uid(uid: string) {
    if (Number.isNaN(Number(uid))) {
      throw new WeiboError('用户 uid 应为纯数字')
    }
    this._uid = uid
  }

  get uid() {
    if (!this._uid) {
      throw new WeiboError('未设置用户的数字 uid')
    }
    return this._uid
  }

  async getDetail(uid?: string): Promise<UserInfo> {
    const [
      baseInfo,
      detailInfo,
    ] = await Promise.all([
      this.fetchService.userInfo(uid || this.uid),
      this.fetchService.userDetail(uid || this.uid),
    ])

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

  async getFollowings(uid: string): Promise<UserBio[]> {
    let page = 0
    const users: UserBio[] = []

    while (true) {
      const data = await this.fetchService.userFollowings({
        page,
        uid,
      })
      const _users = data.users.map(user => ({
        ...UserParser.parseFollowing(user),
        followBy: uid,
      }))

      users.push(..._users)
      page += 1

      if (_users.length === 0 || !data.next_cursor) {
        break
      }
    }

    return users
  }

  async getMyFollowings(page: number): Promise<UserBio[]> {
    const data = await this.fetchService.myFollowings({ page })
    const users = data.follows.users

    return users.map(UserParser.parseFollowing)
  }
}
