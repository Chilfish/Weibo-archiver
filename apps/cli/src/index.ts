#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { parseText } from '@weibo-archiver/shared'

const main = defineCommand({
  meta: {
    name: 'Weibo archiver',
    version: '0.3.11',
    description: 'Weibo archiver 命令行版本',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Your name',
      required: true,
    },
  },
  run({ args }) {
    consola.info(`Hello, ${args.name}!`)
    const text = parseText('Hello, World!')
    consola.info(text)
  },
})

runMain(main)
