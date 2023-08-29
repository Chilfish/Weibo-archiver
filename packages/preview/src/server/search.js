import { join, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import {
  DEFAULT_DICT,
  DEFAULT_HMM_DICT,
  DEFAULT_IDF_DICT,
  DEFAULT_STOP_WORD_DICT,
  cut,
  load,
} from 'nodejs-jieba'
import { _ as posts } from '../../../core/src/static/data.mjs'

const root = resolve(resolve(), 'src/server')
const dictPath = resolve(root, 'userDict.utf8')

load({
  userDict: dictPath,
  dict: DEFAULT_DICT,
  hmmDict: DEFAULT_HMM_DICT,
  idfDict: DEFAULT_IDF_DICT,
  stopWordDict: DEFAULT_STOP_WORD_DICT,
})

/**
 * 分词-id 索引
 * @type {Object<string, Set<number>>}
 */
const index = {}

function addWord(word, id) {
  const words = cut(word)
  words.forEach((word) => {
    if (!index[word])
      index[word] = new Set()

    index[word].add(id)
  })
}

async function cutting() {
  console.log('Start cutting words...')

  posts.forEach((post) => {
    const { id, text } = post
    addWord(text, id)

    if (post.retweeted_status)
      addWord(post.retweeted_status.text, id)
    if (post.card)
      addWord(post.card.title, id)
  })

  await writeFile(
    join(root, 'dirIndex.json'),
    JSON.stringify(
      Object.fromEntries(
        Object.entries(index).map(([key, value]) => [key, [...value]]),
      ),
    ),
  )
}

export function init() {
  readFile(join(root, 'dirIndex.json'), 'utf8')
    .then(async (data) => {
      const res = data.trim()
      if (!res || res === '{}' || res === '')
        await cutting()
      else
        Object.assign(index, JSON.parse(res))

      console.log('Search index is ready.')
    })
}

/**
 * 搜索全文并返回 id 数组
 * @param {string} word
 * @returns {string[]} ids
 */
export default function search(word) {
  const cuts = cut(word)

  const ids = new Set()
  cuts
    .map(word => word.trim().toLowerCase())
    .forEach((word) => {
      if (index[word])
        index[word].forEach(id => ids.add(id))
    })

  return ids.size ? [...ids] : []
}
