import type { Post } from '@weibo-archiver/core'
import type { DocumentData } from 'flexsearch'
import { Charset, Document, IndexedDB } from 'flexsearch'

/**
 * 3. 创建微博搜索服务
 */
class WeiboSearchService {
  private index: Document<DocumentData>
  private db = new IndexedDB('weiboIndexStore')

  constructor() {
    this.index = new Document<DocumentData>({
      store: true,
      encoder: Charset.CJK,
      tokenize: 'forward',
      document: {
        id: 'id',
        index: ['fullText'],
      },
    })
  }

  /**
   * 初始化服务，加载持久化的索引
   * 在应用启动时调用一次
   */
  async init(getWeibos: () => Promise<Post[]>): Promise<void> {
    await this.index.mount(this.db)

    const indexInfo = await this.index.get(-1)
    if (!indexInfo) {
      console.log('检测到索引为空，正在从 Dexie 数据库重建索引...')
      const weibos = await getWeibos()
      for (const weibo of weibos) {
        await this.addWeiboToIndex(weibo)
      }
      await this.index.addAsync({
        id: -1,
        fullText: 'testzzz',
      })
      console.log('索引重建完成。')
    }
    await this.index.commit()
  }

  /**
   * 核心方法：将微博数据处理并添加到 FlexSearch 索引
   * @param weibo 微博对象
   */
  private async addWeiboToIndex(weibo: Post) {
    const originalText = weibo.text || ''
    const retweetText = weibo.retweet?.text || ''

    const fullText = `${originalText} ${retweetText}`

    await this.index.addAsync({
      id: weibo.id,
      fullText,
    })
  }

  /**
   * 执行搜索
   * @param queryString 搜索查询字符串
   * @returns 返回匹配的完整微博id数组
   */
  async search(queryString: string): Promise<string[]> {
    const searchResults = await this.index.searchAsync(queryString)

    const matchedIds = new Set<string>()
    searchResults.forEach((result) => {
      result.result.forEach(id => matchedIds.add(id as string))
    })

    if (matchedIds.size === 0) {
      return []
    }

    return Array.from(matchedIds)
  }
}

export const weiboSearchService = new WeiboSearchService()
