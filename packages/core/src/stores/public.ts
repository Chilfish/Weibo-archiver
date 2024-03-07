import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { UserInfo } from '@types'

type User = UserInfo & {
  importedAt: number
}

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = useStorage<User[]>('users', [])

  const curUid = useStorage('curUid', '')

  function addUser(user: UserInfo | null | undefined) {
    if (!user || users.value.find(u => u.uid === user.uid) !== undefined)
      return

    const importedAt = Date.now()
    users.value.push({ ...user, importedAt })
  }

  return {
    globalImg,
    users,
    curUid,
    addUser,
  }
})
