import type { UserInfo } from '@weibo-archiver/shared'
import { useStorage } from '@vueuse/core'
import { destr } from 'destr'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = useStorage<UserInfo[]>('users', [])
  const curUid = useStorage<string>('curUid', '')

  const curUser = computed(() => users.value.find(u => u.uid === curUid.value))
  const otherUsers = computed(() => users.value.filter(user => user.uid !== curUid.value))

  function load() {
    const _users = localStorage.getItem('users') || '[]'
    const _curUid = localStorage.getItem('curUid') || '0'

    users.value = destr(_users)
    curUid.value = _curUid

    console.log('Load users', users.value, curUid.value)
  }

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
    console.log('rmUser', curUid.value)
    users.value = users.value.filter(u => u.uid !== curUid.value)
    curUid.value = users.value[0]?.uid || ''
  }

  function importUser(user: UserInfo) {
    curUid.value = user.uid
    addUser(user)
  }

  return {
    globalImg,
    users,
    curUid,
    curUser,
    otherUsers,
    addUser,
    rmUser,
    importUser,
    load,
  }
})
