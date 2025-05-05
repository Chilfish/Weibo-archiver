import type { ImportedData, Post } from '@weibo-archiver/core'
import { IDB } from '@weibo-archiver/core'
import { destr } from 'destr'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from './userStore'

export const usePostStore = defineStore('post', () => {
  const route = useRoute()

  const total = ref(0)
  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)

  const loading = ref(false)
  const importing = ref(true)

  const userStore = useUserStore()

  const idb = new IDB()

  async function setup() {
    idb.setup(userStore.curUid)
    total.value = await idb.getCount()
  }

  async function parseAndImport(jsonStr: string): Promise<void> {
    importing.value = true
    const data = destr<ImportedData>(jsonStr, { strict: true })

    const { user, followings, weibo } = data
    userStore.importUser(user)
    await setup()

    await idb.addFollowings(followings)
    await idb.addDBPosts(weibo)

    total.value = await idb.getCount()

    console.log(total.value, weibo.length, user, followings.length)
    importing.value = false
  }

  async function getPosts(): Promise<Post[]> {
    loading.value = true
    const posts = await idb.getDBPosts(curPage.value, pageSize.value)
    loading.value = false
    return posts
  }

  return {
    curPage,
    pageSize,
    total,

    loading,
    importing,

    setup,
    getPosts,
    parseAndImport,
  }
})
