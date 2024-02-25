import {
  weiFetch,
} from '../utils'

export async function userInfo(
  { id, name }: { id?: string, name?: string },
) {
  let params = { }
  if (name)
    params = { screen_name: name }
  else if (id)
    params = { uid: id }

  const { data } = await weiFetch('/profile/info', { params })
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

export async function userDetail(uid?: string) {
  const { data } = await weiFetch('/profile/detail', {
    params: {
      uid: uid ?? '',
    },
  })

  const _uid = data.verified_url.match(/(\d+)/)?.[1] ?? ''

  const detail = {
    createdAt: data.created_at,
    birsday: data.birthday,
  } as {
    createdAt: string
    birsday: string
  }

  const info = await userInfo({ id: _uid })
  return {
    ...info,
    ...detail,
  }
}
