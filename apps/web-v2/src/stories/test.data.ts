import type { Post, UserInfo } from '@workspace/shared'

export const users: UserInfo[] = [
  {
    uid: 'uid-1',
    name: 'Jessica Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&auto=format&fit=crop&crop=face',
    bio: '数字营销专家 | 美食爱好者 | 旅行达人',
    followers: 1284,
    followings: 578,
    createdAt: '2021-01-01',
    birthday: '1990-01-01',
    postCount: 1284,
  },
  {
    uid: 'uid-2',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&auto=format&fit=crop&crop=face',
    bio: '数字营销专家 | 美食爱好者 | 旅行达人',
    followers: 1284,
    followings: 578,
    createdAt: '2021-01-01',
    birthday: '1990-01-01',
    postCount: 1284,
  },
  {
    uid: 'uid-3',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&auto=format&fit=crop&crop=face',
    bio: '数字营销专家 | 美食爱好者 | 旅行达人',
    followers: 1284,
    followings: 578,
    createdAt: '2021-01-01',
    birthday: '1990-01-01',
    postCount: 1284,
  },
]

export const images = [
  {
    src: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&auto=format&fit=crop',
    alt: '长城',
  },
  {
    src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop',
    alt: '颐和园',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1664361480872-6416aab14696?w=600&auto=format&fit=crop',
    alt: '798艺术区',
  },
  {
    src: 'https://images.unsplash.com/photo-1524324463413-57e3d8392df1?w=600&auto=format&fit=crop',
    alt: '胡同',
  },
  {
    src: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=600&auto=format&fit=crop',
    alt: '纪念品',
  },
  {
    src: 'https://images.unsplash.com/photo-1601564921647-b446839a013f?w=600&auto=format&fit=crop',
    alt: '故宫',
  },
  {
    src: 'https://images.unsplash.com/photo-1601564921647-b446839a013f?w=600&auto=format&fit=crop',
    alt: '故宫',
  },
]

export const weiboPosts: Post[] = [
  {
    id: 5146055725552649,
    text: '<a href="//s.weibo.com/weibo?q=%23%E8%8B%A5%E5%8F%B6%E7%9D%A6%23" target="_blank">#若叶睦#</a><a href="//s.weibo.com/weibo?q=%23avemujica%23" target="_blank">#avemujica#</a> ​​​',
    imgs: [
      'https://wx2.sinaimg.cn/large/005VnyMPgy1hzmpftol2qj31c01s07wi.jpg',
      'https://wx3.sinaimg.cn/large/005VnyMPgy1hzmpfr8847j31531pnnpd.jpg',
      'https://wx1.sinaimg.cn/large/005VnyMPgy1hzmpfuzgddj315u1s0u0x.jpg',
      'https://wx4.sinaimg.cn/large/005VnyMPgy1hzmpfsh76fj31c01s07wi.jpg',
      'https://wx4.sinaimg.cn/large/005VnyMPgy1hzmpfq9ljnj31c01s0b2a.jpg',
      'https://wx4.sinaimg.cn/large/005VnyMPgy1hzmpfw5zz0j31c01c0npd.jpg',
    ],
    reposts_count: 14,
    comments_count: 9,
    like_count: 113,
    created_at: 'Wed Mar 19 23:39:17 +0800 2025',
    user: {
      uid: '5428530579',
      name: '绿茄茄茄子',
      avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1080.1080.50/005VnyMPly8hw0tde4kh1j30u00u0jx7.jpg?KID=imgbed,tva&Expires=1742568205&ssig=FKlnYzULuV',
    },
    source: '<a target="_blank" href="https://app.weibo.com/t/feed/5ovRO0" rel="nofollow">Redmi Note 12 Turbo</a>',
    region_name: '发布于 浙江',
    mblogid: 'Pjk7qniuR',
    detail_url: 'https://weibo.com/5428530579/Pjk7qniuR',
    comments: [],
  },
]
