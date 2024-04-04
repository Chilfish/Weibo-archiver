#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { userInfo } from '@weibo-archiver/shared'

import config from './config'

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
    },
    savePath: {
      type: 'string',
      description: '微博数据的保存路径',
      default: config.savePath,
    },
  },
  async run({ args }) {
    config.savePath = args.savePath
    config.uid = args.uid || config.uid

    consola.info('已加载的配置：', JSON.stringify(config, null, 2))

    const user = await userInfo({ id: config.uid })
    console.log(user)
  },
})

runMain(main)
