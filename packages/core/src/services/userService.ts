import type { UserBio, UserInfo } from '@types'
import { weiFetch } from '../utils/fetch'
import { parseFollowing } from '../utils'

export async function userInfo(
  { id, name }: { id?: string, name?: string },
) {
  let params = { }
  if (name)
    params = { screen_name: name }
  else if (id)
    params = { uid: id }

  const { data } = await weiFetch(`/profile/info`, { params })
  const { user } = data

  return {
    uid: user.id.toString(),
    name: user.screen_name,
    avatar: user.avatar_large,
    followers: user.followers_count,
    followings: user.friends_count,
    bio: user.description,
  } as {
    uid: string
    name: string
    avatar: string
    followers: number
    followings: number
    bio: string
  }
}

export async function userDetail(
  uid?: string,
): Promise<UserInfo> {
  const { data } = await weiFetch(`/profile/detail`, {
    params: {
      uid: uid ?? '',
    },
  })

  const _uid = data.verified_url.match(/(\d+)/)?.[1] ?? ''

  const detail = {
    createdAt: data.created_at,
    birthday: data.birthday,
  } as {
    createdAt: string
    birthday: string
  }

  const info = await userInfo({ id: _uid })
  return {
    ...info,
    ...detail,
  }
}

export async function getFollowings(
  uid: string,
  page: number,
) {
  const { users, total_number } = await weiFetch<{
    users: any[]
    total_number: number
  }>('/friendships/friends', {
    params: {
      uid,
      page,
    },
  })

  return {
    users: users.map(parseFollowing),
    total: total_number,
  }
}

export async function getMyFollowings(
  page: number,
) {
  const { data } = await weiFetch<{ data: {
    follows: { users: any[] }
    total_number: number
  } }>('/profile/followContent', {
    params: {
      page,
    },
  })

  return {
    users: data.follows.users.map(parseFollowing),
    total: data.total_number,
  }
}

export function isMe(uid: string) {
  // 获取头像的链接
  const links = Array.from(document.querySelector('[role=navigation]')?.querySelectorAll('a') || [])
  const matched = links[links.length - 1]?.href.match(/\d+/)?.[0] || ''

  return matched === uid
}

export async function fetchFollowings(
  uid: string,
  saveData: (users: UserBio[], total: number) => Promise<void>,
) {
  let page = 1
  const _isMe = isMe(uid)
  while (true) {
    await delay(3000)
    const { users, total } = _isMe
      ? await getMyFollowings(page)
      : await getFollowings(uid, page)

    await saveData(users, total)
    page += 1
    if (users.length === 0)
      break
  }
}
