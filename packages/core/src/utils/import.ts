import type { Post, PostData, UserBio, UserInfo } from '@weibo-archiver/shared'
import { parseOldPost } from '@weibo-archiver/shared'
import destr from 'destr'
import { toRaw } from 'vue'
import { usePostStore, usePublicStore } from '../stores'

/**
 * 判断是否为多行 JSON，以\n分隔的对象
 * ```
 * {}
 * {}
 * ```
 */
function isMutilLineJson(content: string) {
  const lines = content.split('\n').filter(Boolean)

  // 只检查第一行和最后一行
  return lines.length > 1
    && lines[0].startsWith('{')
    && lines[lines.length - 1].startsWith('{')
}

function parseMultiLineJson(content: string) {
  const lines = content.split('\n').filter(Boolean)
  return lines.map(line => destr<Post>(line, { strict: true }))
}

export async function parseAndImport(_data: string) {
  const postStore = usePostStore()
  const publicStore = usePublicStore()

  const data = isMutilLineJson(_data)
    ? parseMultiLineJson(_data)
    : destr<PostData | Post[]>(_data, { strict: true })

  let user: UserInfo
  let posts: Post[]
  let followings: UserBio[] = []

  if (Array.isArray(data)) {
    // 来自 cli 的多行json
    if (!data[0].user?.uid) {
      posts = data
      user = publicStore.curUser as UserInfo
    }
    else {
      posts = data.map(post => parseOldPost(post))

      const _user = data[0].user as any
      // @ts-expect-error bad
      user = publicStore.users.find(u => u.uid === _user?.id)
      if (!user) {
        user = {
          uid: _user.id,
          name: _user.screen_name,
          avatar: _user.profile_image_url,
          postCount: posts.length,
          followers: 0,
          followings: 0,
          bio: '',
          birthday: '',
          createdAt: '',
        }
      }
    }
  }
  else {
    posts = data.weibo
    user = data.user
    followings = data.followings
  }
  user = toRaw(user)

  publicStore.importUser(user)

  await postStore.set(posts, user, followings, false)
  user.postCount = postStore.total

  console.log('[import] 导入成功', user, posts, followings)
}

export async function readFile(e: Event) {
  return new Promise<string>((resolve, reject) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      reject(new Error('No file selected'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      resolve(data)
    }
    reader.readAsText(file)
  })
}
