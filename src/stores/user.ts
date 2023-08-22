import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const uid = ref('')

  const setUid = (id: string) => {
    uid.value = id
  }

  return {
    uid,
    setUid,
  }
})
