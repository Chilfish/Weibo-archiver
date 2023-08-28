import { cut } from 'nodejs-jieba'
import { _ as posts } from '../../../core/src/static/data.mjs'

export const result = cut('南京市长江大桥')

console.log(posts.length)
