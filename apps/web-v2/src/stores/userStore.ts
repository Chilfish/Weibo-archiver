import type { Following, UserInfo } from '@weibo-archiver/core'
import { useStorage } from '@vueuse/core'
import { idb } from '@weibo-archiver/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const curUid = useStorage<string>('curUid', '')
  const users = ref<UserInfo[]>([])
  const curUser = ref<UserInfo>({} as unknown as UserInfo)
  const isLoadingUser = ref(false)

  async function load() {
    if (curUid.value) {
      await idb.setCurUser(curUid.value)
    }

    users.value = await idb.getUsers()
    curUser.value = idb.curUser
  }

  async function setCurUid(uid: string) {
    isLoadingUser.value = true
    curUid.value = uid
    await idb.setCurUser(uid)
    curUser.value = idb.curUser
    isLoadingUser.value = false
  }

  async function addUser(user: UserInfo | null | undefined) {
    if (!user) {
      return
    }

    await idb.addUser(user)
  }

  async function importUser(user: UserInfo) {
    await addUser(user)
    await setCurUid(user.uid)
  }

  async function getFollowings(): Promise<Following[]> {
    return idb.getFollowings()
  }

  return {
    users,
    curUser,
    curUid,
    isLoadingUser,
    addUser,
    importUser,
    load,
    setCurUid,
    getFollowings,
  }
})
