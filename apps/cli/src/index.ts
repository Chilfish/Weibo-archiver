#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'

import type { UserBio } from '@weibo-archiver/shared'
import { fetchFollowings, fetchPosts, userDetail } from '@weibo-archiver/shared'
import type { Config } from './config'
import { configFile, getConfig, saveConfig } from './config'
import { appendJson, getLastLine, renameFile, saveJson } from './utils'

let config: Config

/**
 * CLI 程序入口
 */
const main = defineCommand({
  meta: {
    name: 'weibo-archiver',
    version: '0.3.11',
    description: 'Weibo archiver 命令行版本',
  },
  args: {
    uid: {
      type: 'string',
      description: '微博用户的 uid',
      required: true,
    },
    savePath: {
      type: 'string',
      description: '微博数据的保存路径',
    },
    cookie: {
      type: 'string',
      description: '微博的 cookie',
    },
    restart: {
      type: 'boolean',
      description: '是否重新开始抓取',
      default: true,
    },
    startAt: {
      type: 'string',
      description: '开始时间（YYYY-MM-DD）',
    },
    endAt: {
      type: 'string',
      description: '结束时间（YYYY-MM-DD）',
    },
    fetchAll: {
      type: 'boolean',
      description: '是否抓取全部微博（优先级高于范围获取）',
      default: true,
    },
    largePic: {
      type: 'boolean',
      description: '是否导出为原图',
      default: true,
    },
    repostPic: {
      type: 'boolean',
      description: '是否导出转发的图片',
      default: true,
    },
    repost: {
      type: 'boolean',
      description: '是否导出转发',
      default: true,
    },
    comment: {
      type: 'boolean',
      description: '是否导出评论',
      default: true,
    },
    // followings: {
    //   type: 'boolean',
    //   description: '是否导出关注的人',
    //   default: true,
    // },
    followingsOnly: {
      type: 'boolean',
      description: '是否只导出关注的人',
      default: false,
    },
    weiboOnly: {
      type: 'boolean',
      description: '是否只导出微博',
      default: false,
    },
    commentCount: {
      type: 'string',
      description: '导出评论的数量',
      default: '10',
    },
    proxyAgent: {
      type: 'string',
      description: '代理地址',
    },
    // noFavorite: {
    //   type: 'boolean',
    //   description: '是否导出收藏',
    //   default: true,
    // },

    // prompt: {
    //   type: 'boolean',
    //   description: '是否需要交互式输入，置否则使用默认配置',
    //   default: true,
    // },
  },
  async run({ args }) {
    config = await getConfig(args.uid)
    await checkArgs(args)

    consola.info('配置文件：', configFile(args.uid))
    consola.info('已加载的配置：', config);
    (globalThis as any).fetchOptions = config

    await running()

    consola.success('全部任务完成')
  },
})

async function checkArgs(args: any) {
  const startAt = new Date(args.startAt).getTime()
  const endAt = new Date(args.endAt).getTime()

  if (!args.fetchAll && (
    !startAt || !endAt
    || startAt > endAt
    || Number.isNaN(startAt)
    || Number.isNaN(endAt)
  )) {
    consola.error('请正确填写开始时间和结束时间')
    process.exit(1)
  }

  let { fetchedCount, curPage, savePath } = config
  if (args.savePath)
    savePath = args.savePath

  if (args.restart) {
    fetchedCount = 0
    curPage = 0
    await renameFile(savePath, `data-${args.uid}.json`)
  }

  config = {
    fetchedCount,
    curPage,
    savePath,
    uid: args.uid,
    cookie: args.cookie || config.cookie,
    proxyAgent: args.proxyAgent || config.proxyAgent,
    isFetchAll: args.fetchAll,
    largePic: args.largePic,
    repostPic: args.repostPic,
    hasRepost: args.repost,
    hasComment: args.comment,
    followingsOnly: args.followingsOnly,
    weiboOnly: args.weiboOnly,
    commentCount: Number(args.commentCount),
    startAt,
    endAt,
  }

  if (!config.cookie) {
    consola.error('请填写 cookie')
    process.exit(1)
  }

  if (config.proxyAgent) {
    // 忽略证书错误
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  await saveConfig(config)
}

async function getUserMeta() {
  const { uid, savePath } = config
  consola.info('开始抓取用户信息：', uid)

  const user = await userDetail(uid)
  const followings: UserBio[] = []

  await fetchFollowings(uid, async (data) => {
    consola.info(`TODO:进度条 抓取关注列表：${followings.length}/${user.followings}`)
    followings.push(...data)
  })

  const userMeta = { user, followings }
  await saveJson(savePath, `meta-${uid}.json`, userMeta)

  consola.success('抓取完成')
}

async function getWeibo() {
  let { uid, fetchedCount, savePath } = config
  let total = 0

  const lastId = await getLastLine(savePath, `data-${uid}.json`)
    .then((data) => {
      return (+data.id || 0) as number
    })

  consola.info('开始抓取微博：', uid, '上次抓取到的 id：', lastId)

  const { start } = fetchPosts({
    fetchOptions: () => ({
      ...config,
      async savePost(post) {
        // 按时间顺序来说，从上往下 id 逐渐减小
        if (post.id >= lastId)
          return

        consola.info(`TODO: 进度条, ${++fetchedCount}/${total}`)
        config.curPage = Math.ceil(fetchedCount / 20)
        config.fetchedCount = fetchedCount

        await appendJson(savePath, `data-${uid}.json`, post)
        await saveConfig(config)
      },
    }),
    onFinish: async () => {
      consola.success('抓取完成')
    },
    setTotal: (_total) => {
      if (!total)
        total = _total
    },
  })

  await start()
}

async function running() {
  const { weiboOnly, followingsOnly } = config

  !weiboOnly && await getUserMeta()
  !followingsOnly && await getWeibo()
}

runMain(main)
