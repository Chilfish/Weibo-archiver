import type { FetchConfig } from '@weibo-archiver/core'
import type { TaskConfig } from '@/types'
import { initTipc } from '@weibo-archiver/core'
import { sendMessage } from 'webext-bridge/background'
import { curTabId } from '@/entrypoints/background'
import { taskScheduler } from '@/entrypoints/background/taskScheduler'
import { fetchManager } from '@/lib/fetchManager'
import { storageManager } from '@/lib/storageManager'
import { getLocalUsers, sendDataToWeb } from './contentScript'

export * from './window/message'
export type PopupBackgroundRouter = ReturnType<typeof popup_background_router>
export type PopupContentRouter = ReturnType<typeof popup_content_router>
export type WindowBackgroundRouter = ReturnType<typeof window_background_router>
export type BackgroundContentRouter = ReturnType<typeof background_content_router>

export function popup_background_router() {
  const t = initTipc()
  return {
    getUserInfo: t.procedure
      .input<{ uid: string }>()
      .action(async ({ input }) => {
        return await fetchManager.fetchUser(input.uid)
      }),

    updateTask: t.procedure
      .input<{ taskId: string, config: Partial<TaskConfig> }>()
      .action(async ({ input }) => {
        return await taskScheduler.updateTaskSchedule(input.taskId, input.config)
      }),

    setGlobalConfig: t.procedure
      .input<{ interval: number }>()
      .action(async ({ input }) => {
        return await storageManager.setGlobalConfig(input.interval)
      }),
  }
}

export function popup_content_router() {
  const t = initTipc()
  return {
    sendDataToWeb: t.procedure.action(async () => await sendDataToWeb()),
  }
}

export function window_background_router() {
  const t = initTipc()
  return {
    fetchMe: t.procedure
      .action(async () => {
        return fetchManager.getCurUserInfo()
      }),

    searchUser: t.procedure
      .input<{ searchText: string }>()
      .action(async ({ input }) => {
        return fetchManager.searchUser(input.searchText)
      }),

    fetchFollowings: t.procedure
      .input<{ uid: string }>()
      .action(async ({ input }) => {
        return fetchManager.fetchFollowings(input.uid)
      }),

    fetchAllPosts: t.procedure
      .input<{ uid: string } & FetchConfig>()
      .action(async ({ input }) => {
        Object.assign(fetchManager.config, input)

        return fetchManager.fetchAllWeibo({
          uid: input.uid,
          async onFetch(data) {
            await sendMessage('fetch:all-posts-paged', data, {
              tabId: curTabId(),
              context: 'window',
            })
          },
        })
      }),

    fetchFavorites: t.procedure
      .input<{ uid: string }>()
      .action(async ({ input }) => {
        return fetchManager.fetchFavorites({
          uid: input.uid,
          onFetch: async posts =>
            sendMessage('fetch:favorites-paged', posts, {
              tabId: curTabId(),
              context: 'window',
            }),
        })
      }),

    ping: t.procedure
      .input()
      .action(() => true),
  }
}

export function background_content_router() {
  const t = initTipc()

  return {
    getLocalUsers: t.procedure.action(() => getLocalUsers()),
  }
}
