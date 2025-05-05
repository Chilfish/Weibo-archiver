<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'
import Weibo from '@/components/weibo/Weibo.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

userStore.users = [{
  uid: '2803301701',
  name: '人民日报人民日报人民日报人民日报人民日报人民日报人民日报',
  avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1018.1018.180/0033ImPzly8h8vgemh8kxj60sa0sadgw02.jpg?KID=imgbed,tva&Expires=1746297596&ssig=Tw9kqM%2FF80',
  followers: 155805431,
  followings: 3092,
  bio: '人民日报法人微博。参与、沟通、记录时代。',
  createdAt: '',
  birthday: '',
}]
userStore.curUid = userStore.users[0].uid

const posts: Post[] = [{
  id: 5162239272420332,
  created_at: 1746257215000,
  source: '<a target="_blank" href="https://t.sina.com.cn" rel="nofollow">微博视频号</a>',
  detail_url: 'https://weibo.com/detail/5162239272420332',
  mblogid: 'Pq77Va9DC',
  text: '【近距离感受！#动车司机发车前有多忙#】一镜到底#揭秘动车发车前司机的准备工作#：手比、眼看、口呼，每一步都一丝不苟，只为确保万无一失、安全启程，戳视频感受↓↓这个假期，愿你出行平安！（人民日报记者李心萍） https://video.weibo.com/show?fid=1034:5162238856593468 ​​​',
  imgs: [],
  region_name: '',
  reposts_count: 176,
  comments_count: 253,
  like_count: 1521,
  card: {
    link: 'https://video.weibo.com/show?fid=1034:5162238856593468',
    title: '人民日报的微博视频',
    img: 'https://wx2.sinaimg.cn/orj480/0033ImPzly1i12c2u9zvdj60u01407qp02.jpg',
    desc: '人民日报的微博视频',
  },
  comments: [
    {
      id: 5162242019429322,
      text: '所有看似繁琐的步骤，都是用血泪换回来的教训',
      img: '',
      created_at: 'Sat May 03 15:37:50 +0800 2025',
      region_name: '来自北京',
      floor_number: 60,
      comments_count: 1,
      like_count: 109,
      user: {
        uid: '1777369455',
        name: '马_不停蹄',
        avatar: 'https://tva4.sinaimg.cn/crop.0.0.180.180.50/69f0816fjw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1746306390&ssig=OEL%2ByTAe51',
      },
    },
    {
      id: 5162241931611929,
      text: '确保行车安全，每一个步骤、每一个细节都重要。[作揖][作揖]',
      img: '',
      created_at: 'Sat May 03 15:37:29 +0800 2025',
      region_name: '来自四川',
      floor_number: 59,
      comments_count: 0,
      like_count: 46,
      user: {
        uid: '3102299583',
        name: '大爷大小八卦',
        avatar: 'https://tvax3.sinaimg.cn/crop.147.147.368.368.50/003nWVQ3ly8gufetpz24lj60ig0igta502.jpg?KID=imgbed,tva&Expires=1746306390&ssig=IqAOx6Nnbl',
      },
    },
    {
      id: 5162251065757920,
      text: '这种形式感就是强化大脑的记忆[赞]',
      img: '',
      created_at: 'Sat May 03 16:13:47 +0800 2025',
      region_name: '来自广东',
      floor_number: 156,
      comments_count: 0,
      like_count: 32,
      user: {
        uid: '1825788623',
        name: 'Y_Q_H_Y',
        avatar: 'https://tvax2.sinaimg.cn/crop.0.0.970.970.50/6cd352cfly8hisxd9jphfj20qy0qy44k.jpg?KID=imgbed,tva&Expires=1746306390&ssig=AvqrooYG7H',
      },
    },
    {
      id: 5162239791729354,
      text: '一路平安',
      img: '',
      created_at: 'Sat May 03 15:28:59 +0800 2025',
      region_name: '来自河南',
      floor_number: 19,
      comments_count: 0,
      like_count: 15,
      user: {
        uid: '7589046985',
        name: '小狗恋爱辑',
        avatar: 'https://tvax3.sinaimg.cn/crop.0.0.1080.1080.50/008hARNDly8i12bkfe0e3j30u00u0abk.jpg?KID=imgbed,tva&Expires=1746306390&ssig=tSI1MrpYjJ',
      },
    },
    {
      id: 5162240471204343,
      text: '他是在跟自己说还是在向哪里汇报啊',
      img: '',
      created_at: 'Sat May 03 15:31:41 +0800 2025',
      region_name: '来自江苏',
      floor_number: 30,
      comments_count: 6,
      like_count: 8,
      user: {
        uid: '5619855534',
        name: '兰子琴zwjane',
        avatar: 'https://tvax1.sinaimg.cn/crop.0.0.996.996.50/0068kl9cly8gn05uc3xohj30ro0romzc.jpg?KID=imgbed,tva&Expires=1746306390&ssig=T73W0b1UYD',
      },
    },
  ],
}, {
  id: 5162258216786283,
  created_at: 1746261732000,
  source: '微博网页版',
  detail_url: 'https://weibo.com/detail/5162258216786283',
  mblogid: 'Pq7Ctstqb',
  text: '#向全国广大青年致以节日祝贺#【习近平给谢依特小学戍边支教西部计划志愿者服务队队员回信强调 #到祖国和人民最需要的地方#发光发热 为中国式现代化建设贡献青春力量】在五四青年节到来之际，中共中央总书记、国家主席、中央军委主席习近平给新疆克孜勒苏柯尔克孜自治州阿图什市哈拉峻乡谢依特小学戍边支教西部计划志愿者服务队全体队员回信，向全国广大青年致以节日祝贺并提出殷切期望。\n\n习近平在回信中说，你们响应党的号召到西部边疆地区教书育人，在促进当地教育事业发展、促进民族团结进步、促进兴边富民和稳边固边中发挥了积极作用，自身也得到历练和成长。\n\n习近平强调，这些年，越来越多年轻人选择到西部、到乡村、到基层志愿服务，无私奉献，展现了新时代中国青年昂扬向上的精神风貌和强国有我的责任担当。希望广大青年坚定理想信念，厚植家国情怀，练就过硬本领，发扬奋斗精神，到祖国和人民最需要的地方发光发热，为中国式现代化建设贡献青春力量。\n\n谢依特小学是一所距离边境线47公里、主要由柯尔克孜族学生组成的村级小学，2022年8月成为克州首个西部计划志愿者包校支教的试点学校。近日，谢依特小学戍边支教西部计划志愿者服务队队员给习总书记写信，汇报戍边支教的情况和体会，表达扎根西部、服务边疆的决心。',
  imgs: [
    'https://wx2.sinaimg.cn/large/0033ImPzly1i12e9lc5hrj60ob0obgr902.jpg',
  ],
  reposts_count: 97,
  comments_count: 230,
  like_count: 572,
  region_name: '',
  comments: [],
}]
</script>

<template>
  <section
    class="flex flex-col gap-4 lg:px-12"
  >
    <Weibo
      v-for="post in posts"
      :key="post.mblogid"
      :post="post"
    />
  </section>
</template>
