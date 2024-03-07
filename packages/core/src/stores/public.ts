import { defineStore } from 'pinia'
import type { UserInfo } from '@types'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = ref<UserInfo[]>([])
  const curUid = ref('')

  watchEffect(() => {
    if (typeof localStorage === 'undefined' || !users.value.length || !curUid.value)
      return

    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem('curUid', curUid.value)
  })

  function addUser(user: UserInfo | null | undefined) {
    console.log('addUser', users.value.length, user)
    if (!user || users.value.find(u => u.uid === user.uid) !== undefined)
      return

    users.value.push(user)
    curUid.value = user.uid
  }

  return {
    globalImg,
    users,
    curUid,
    addUser,
  }
})
