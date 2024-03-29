import { defineStore } from 'pinia'
import type { UID, UserInfo } from '@types'
import { IDB } from '../utils/storage'
import { parseOldPost } from '../utils'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = ref<UserInfo[]>([])
  const curUid = ref('')

  const curUser = computed(() => users.value.find(u => u.uid === curUid.value))
  const otherUsers = computed(() => users.value.filter(user => user.uid !== curUid.value))

  watchEffect(() => {
    if (typeof localStorage === 'undefined')
      return

    users.value.length && localStorage.setItem('users', JSON.stringify(users.value))
    curUid.value && localStorage.setItem('curUid', curUid.value)
  })

  function addUser(user: UserInfo | null | undefined) {
    if (!user || users.value.find(u => u.uid === user.uid))
      return

    users.value.push(user)
  }

  function rmUser() {
    users.value = users.value.filter(u => u.uid !== curUid.value)
    curUid.value = users.value[0]?.uid || ''
  }

  function importUser(user: UserInfo) {
    curUid.value = user.uid
    addUser(user)
  }

  /**
   * 从旧版中迁移 user 数据到 idb 中
   */
  async function migrateUser() {
    if (!curUser.value)
      return

    const dbName = `uid-${curUid.value}` as UID
    const idb = new IDB(dbName)

    const user = await idb.getUserInfo()
    if (user)
      return await idb.close()

    await idb.setUserInfo(toRaw(curUser.value))
    const posts = await idb.getAllDBPosts()
    const newPosts = posts.map(post => parseOldPost(post))
    await idb.addDBPosts(newPosts, true, false)

    return await idb.close()
  }

  return {
    globalImg,
    users,
    curUid,
    curUser,
    otherUsers,
    addUser,
    rmUser,
    migrateUser,
    importUser,
  }
})
