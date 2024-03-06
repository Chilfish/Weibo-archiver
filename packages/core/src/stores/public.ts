import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')
  const users = useStorage<{
    uid: string
    name: string
    avatar: string
    importedAt: number
  }[]>('users', [])

  const curUid = useStorage('curUid', '')

  return {
    globalImg,
    users,
    curUid,
  }
})
