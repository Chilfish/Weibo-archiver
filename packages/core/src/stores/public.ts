import { defineStore } from 'pinia'
import type { UserInfo } from '@types'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = ref<UserInfo[]>([])
  const curUid = ref('')

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

  return {
    globalImg,
    users,
    curUid,
    addUser,
  }
})
