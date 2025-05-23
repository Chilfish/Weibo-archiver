import type { ConfigManager } from './ConfigManager'
import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { FetchService, PostService, UserService } from '@weibo-archiver/core/src/services'
import { appendJson, readJson, saveJson } from '../utils'

interface FetchState {
  status: 'idle' | 'running' | 'finish'
  fetchType: 'weibo' | 'followings' | 'favorites'
}

export class FetchManager {
  private fetchService = new FetchService()
  private userService = new UserService(this.fetchService)
  private postService = new PostService(this.userService, this.fetchService)

  fetchState: FetchState = {
    status: 'idle',
    fetchType: 'weibo',
  }

  fetchCount = {
    posts: 0,
    followings: 0,
    favorites: 0,
  }

  filenameSuffix = 0

  constructor(
    private configManager: ConfigManager,
  ) {
  }

  async startFetch() {
    this.fetchState.status = 'running'
    const config = await this.configManager.load()
    const savePath = this.configManager.savePath

    const {
      isFetchAll,
      startAt,
      endAt,
      sinceId,
      curPage,
      hasRepost,
      hasComment,
      commentCount,
      repostPic,
      uid,
      hasWeibo,
      hasFollowings,
      hasFavorites,
      cookie,
    } = config

    this.userService.uid = uid
    this.fetchService.setFetcher(cookie)

    this.filenameSuffix = Date.now()

    this.fetchService.onRawFetch = async ({ data, type }) => {
      await saveJson({
        filename: () => `${Date.now()}.json`,
        savePath: path.join(savePath, 'raw', type),
        data,
        intend: 2,
      })
    }

    const user = await this.userService.getDetail(uid)
    await saveJson({
      savePath,
      filename: 'data-user.json',
      data: user,
      intend: 2,
    })

    if (hasWeibo) {
      this.fetchState.fetchType = 'weibo'
      await this.postService.getAllPosts({
        isFetchAll,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        sinceId,
        page: curPage,
        hasret: hasRepost ? '1' : '0',
        hasRepostPic: repostPic,
        commentsCount: hasComment ? commentCount : 0,
        onFetched: async ({ posts, page, sinceId }) => {
          const filtered = posts
            .filter((post) => {
              if (hasRepost)
                return true
              return !!post.retweet?.mblogid
            })
          this.fetchCount.posts += filtered.length
          await this.configManager.update({
            curPage: page,
            sinceId: sinceId || '',
          })
          await appendJson({
            savePath,
            name: `weibo.jsonl`,
            data: filtered,
          })
        },
      })
    }

    if (hasFollowings) {
      this.fetchState.fetchType = 'followings'
      const followings = await this.userService.getFollowings({ uid })
      await saveJson({
        savePath,
        filename: `data-followings-${this.filenameSuffix}.json`,
        data: followings,
        intend: 0,
      })
    }

    if (hasFavorites) {
      this.fetchState.fetchType = 'favorites'
      const favorites = await this.postService.getFavorites()
      await saveJson({
        savePath,
        filename: `data-favorites-${this.filenameSuffix}.json`,
        data: favorites,
        intend: 0,
      })
    }

    await this.convertJsonl()
    await this.mergeData()

    this.fetchState.status = 'finish'
  }

  async convertJsonl() {
    const savePath = this.configManager.savePath
    const jsonlFilePath = path.join(savePath, 'weibo.jsonl')
    const jsonlFile = await readFile(jsonlFilePath, 'utf-8').catch(() => '')

    if (!jsonlFile) {
      return
    }

    const jsonData = jsonlFile
      .split('\n')
      .filter(Boolean)
      .flatMap(text => JSON.parse(text) as object[])

    await saveJson({
      savePath,
      filename: `data-weibo-${this.filenameSuffix}.json`,
      data: jsonData,
      intend: 2,
    })

    await rm(jsonlFilePath)
  }

  async mergeData() {
    const savePath = this.configManager.savePath

    const weiboFilePath = path.join(savePath, `data-weibo-${this.filenameSuffix}.json`)
    const followingsFilePath = path.join(savePath, `data-followings-${this.filenameSuffix}.json`)
    const favoritesFilePath = path.join(savePath, `data-favorites-${this.filenameSuffix}.json`)
    const userDataFilePath = path.join(savePath, `data-user.json`)

    const weiboData = await readJson(weiboFilePath).catch(() => [])
    const followingsData = await readJson(followingsFilePath).catch(() => [])
    const favoritesData = await readJson(favoritesFilePath).catch(() => [])
    const userData = await readJson(userDataFilePath).catch(() => {})

    await saveJson({
      savePath,
      filename: `weibo-data-${this.filenameSuffix}.json`,
      data: {
        weibo: weiboData,
        followings: followingsData,
        favorites: favoritesData,
        user: userData,
      },
      intend: 2,
    })

    await Promise.all([weiboFilePath, followingsFilePath, favoritesFilePath, userDataFilePath]
      .map(async filePath => rm(filePath).catch(() => {})))
  }
}
