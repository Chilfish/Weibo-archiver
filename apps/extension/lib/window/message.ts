import { idb, initTipc } from '@weibo-archiver/core'

export function background_window_router() {
  const t = initTipc()

  return {
    getNewestPost: t.procedure
      .input<{ uid: string }>()
      .action(async ({ input }) => {
        return idb.getNewestPost(input.uid)
      }),
  }
}

export type BackgroundWindowRouter = ReturnType<typeof background_window_router>
