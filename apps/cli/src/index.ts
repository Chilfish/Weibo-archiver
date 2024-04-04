#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { parseText, userInfo } from '@weibo-archiver/shared'

import config from './config'

/**
 * CLI 程序入口
 */
const main = defineCommand({
  meta: {
    name: 'Weibo archiver',
    version: '0.3.11',
    description: 'Weibo archiver 命令行版本',
  },
  args: {
    name: {
      type: 'string',
      description: 'Your name',
      required: true,
    },
    savePath: {
      type: 'string',
      description: '微博数据的保存路径',
      default: config.savePath,
    },
  },
  async run({ args }) {
    consola.info(`Hello`, parseText(args.name))
    config.savePath = args.savePath

    consola.info('已加载的配置：', config)

    const user = await userInfo({ name: args.name })
    console.log(user)
  },
})

runMain(main)
