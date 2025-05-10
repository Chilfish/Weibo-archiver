import type { FetchState } from '../types'
import { FetchService, PostService, UserService } from '@weibo-archiver/core'
import { reactive } from 'vue'
import { config, useConfig } from './useConfig'
import { usePost } from './usePost'

// 全局状态
const { updateConfig } = useConfig()
const postStore = usePost()

const fetchService = new FetchService()
export const userService = new UserService(fetchService, config.value.user?.uid)
export const postService = new PostService(userService, fetchService)

export const fetchState = reactive<FetchState>({
  isStart: false,
  isFinish: false,
  isFetchingFollowings: false,
})

export async function startFetch() {
  fetchState.isStart = true
  await postStore.resetState()
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
    user,
    weiboOnly,
    followingsOnly,
  } = config.value

  if (!followingsOnly) {
    await postService.getPosts({
      isFetchAll,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      sinceId,
      page: curPage,
      hasret: hasRepost ? '1' : '0',
      hasRepostPic: repostPic,
      commentsCount: hasComment ? commentCount : 0,
      async onFetched({ posts, page, sinceId, postsTotal }) {
        await Promise.all(
          posts
            .filter((post) => {
              if (hasRepost)
                return true
              return !!post.retweet?.mblogid
            })
            .map(postStore.addPost),
        )
        updateConfig({
          curPage: page,
          sinceId,
          total: postsTotal,
        })
      },
    })
  }

  if (!weiboOnly) {
    const followings = await userService.getFollowings(user!.uid)
    await postStore.addFollowingUsers(followings)
  }

  fetchState.isFinish = true
}
