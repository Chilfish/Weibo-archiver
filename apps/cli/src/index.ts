import type { Config } from './lib/ConfigManager'
import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { ConfigManager } from './lib/ConfigManager'
import { FetchManager } from './lib/FetchManager'

const argv = await yargs()
  .scriptName('weibo-archiver')
  .usage('$0 <cmd> [args]')
  .options({
    uid: {
      type: 'string',
      description: '用户的数字 id',
      demandOption: true,
    },
    cookie: {
      type: 'string',
      description: '微博登录的 cookie',
    },
    fetchAll: {
      type: 'boolean',
      description: '是否获取所有数据',
      default: true,
    },
    hasRepost: {
      type: 'boolean',
      description: '包含转发微博',
      default: true,
    },
    hasComment: {
      type: 'boolean',
      description: '包含评论',
      default: true,
    },
    repostPic: {
      type: 'boolean',
      description: '包含转发微博的图片',
      default: true,
    },
    commentCount: {
      type: 'number',
      description: '评论数',
      default: 5,
    },
    sinceId: {
      type: 'string',
      description: 'since_id',
      default: '',
    },
    startAt: {
      type: 'string',
      description: '开始时间，如 2000-01-01 格式',
    },
    endAt: {
      type: 'string',
      description: '结束时间，如 2000-01-01 格式',
    },
    curPage: {
      type: 'number',
      description: '当前页',
      default: 1,
    },
    hasFollowings: {
      type: 'boolean',
      description: '爬取关注列表',
      default: true,
    },
    hasFavorites: {
      type: 'boolean',
      description: '爬取收藏列表',
      default: true,
    },
    hasWeibo: {
      type: 'boolean',
      description: '爬取微博列表',
      default: true,
    },
    useConfig: {
      type: 'boolean',
      description: '使用配置文件',
      default: false,
    },
  })
  .help()
  .alias('h', 'help')
  .alias('v', 'version')
  .parse(hideBin(process.argv))

const configManager = new ConfigManager(argv.uid)
const fetchManager = new FetchManager(configManager)

if (!argv.useConfig) {
  if (!argv.cookie) {
    console.error('缺少必填的 Cookie')
    process.exit(1)
  }

  if (argv.startAt && argv.endAt) {
    checkDate(argv.startAt)
    checkDate(argv.endAt)
  }

  const config: Config = {
    curPage: argv.curPage,
    hasComment: argv.hasComment,
    hasRepost: argv.hasRepost,
    hasFavorites: argv.hasFavorites,
    hasFollowings: argv.hasFollowings,
    hasWeibo: argv.hasWeibo,
    uid: argv.uid,
    cookie: argv.cookie,
    sinceId: argv.sinceId,
    commentCount: argv.commentCount,
    repostPic: argv.repostPic,
    isFetchAll: argv.fetchAll,
    startAt: argv.startAt || '',
    endAt: argv.endAt || '',
  }
  await configManager.update(config)
}

await fetchManager.startFetch()

function checkDate(date: string) {
  if (Number.isNaN(new Date(date).getTime())) {
    throw new TypeError('日期必须为 YYYY-MM-DD 格式')
  }
}
