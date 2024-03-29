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
    if (!user)
      return

    const idx = users.value.findIndex(u => u.uid === user.uid)

    if (idx < 0)
      users.value.push(user)
    else
      users.value.splice(idx, 1, user)
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
    const dbName = `uid-${curUid.value}` as UID
    const idb = new IDB(dbName)

    const userInDB = await idb.getUserInfo()

    if (userInDB) {
      importUser(userInDB)
      return await idb.close()
    }

    const posts = await idb.getAllDBPosts()
    let user = curUser.value
    if (!user) {
      const _user = users.value.find(u => u.uid === curUid.value) || posts[0].user as any

      user = {
        uid: _user.id,
        name: _user.screen_name,
        avatar: _user.profile_image_url,
        postCount: posts.length,
        followers: 0,
        followings: 0,
        bio: '',
        birthday: '',
        createdAt: '',
      }
      importUser(user)
    }

    const newPosts = posts.map(post => parseOldPost(post))
    await idb.addDBPosts(newPosts, true, false)

    await idb.setUserInfo(toRaw(user))
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
