export const WEIBO_BASE_URL = 'https://weibo.com/ajax'

export const FETCH_PATH = {
  PROFILE: '/profile/info',
  PROFILE_DETAIL: '/profile/detail',
  FOLLOWINGS: '/friendships/friends',
  FOLLOWINGS_MINE: '/profile/followContent',

  SEARCH: '/side/search',

  POSTS_ALL: '/statuses/mymblog',
  POSTS_RANGE: '/statuses/searchProfile',
  POST_LONGTEXT: '/statuses/longtext',
  POST_COMMENTS: '/statuses/buildComments',
} as const
