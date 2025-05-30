import type { FetchState } from '@/types'
import { FetchService, PostService, UserService } from '@weibo-archiver/core'
import { reactive, ref } from 'vue'
import { config, useConfig } from './useConfig'
import { usePost } from './usePost'

// 全局状态
const { updateConfig } = useConfig()
const postStore = usePost()

const fetchService = new FetchService()
export const userService = new UserService(fetchService, config.value.user?.uid)
export const postService = new PostService(userService, fetchService)

export const fetchState = reactive<FetchState>({
  status: 'idle',
  fetchType: 'weibo',
})

export const fetchCount = ref({
  posts: 0,
  followings: 0,
  favorites: 0,
})

export async function startFetch() {
  fetchState.status = 'running'
  if (!config.value.restore) {
    await postStore.resetState()
  }

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
    hasWeibo,
    hasFollowings,
    hasFavorites,
  } = config.value

  if (hasWeibo) {
    fetchState.fetchType = 'weibo'
    await postService.getAllPosts({
      isFetchAll,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      sinceId,
      page: curPage,
      hasret: hasRepost ? '1' : '0',
      hasRepostPic: repostPic,
      commentsCount: hasComment ? commentCount : 0,
      async onFetched({ posts, page, sinceId }) {
        const filtered = posts
          .filter((post) => {
            if (hasRepost)
              return true
            return !!post.retweet?.mblogid
          })
        await postStore.addPosts(filtered)
        updateConfig({
          curPage: page,
          sinceId,
        })
      },
    })
  }

  if (hasFollowings) {
    fetchState.fetchType = 'followings'
    const followings = await userService.getFollowings(user!.uid)
    await postStore.addFollowingUsers(followings)
  }

  if (hasFavorites) {
    fetchState.fetchType = 'favorites'
    const data = await postService.getFavorites()
    await postStore.addFavorites(data)
  }

  fetchState.status = 'finish'
}
