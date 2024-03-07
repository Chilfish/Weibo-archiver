import { defineStore } from 'pinia'
import type { UserInfo } from '@types'

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

  return {
    globalImg,
    users,
    curUid,
    curUser,
    otherUsers,
    addUser,
    rmUser,
  }
})
