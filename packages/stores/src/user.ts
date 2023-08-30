import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const uid = ref('')
  const name = ref('')

  function set(id?: string, n?: string) {
    id && (uid.value = id)
    n && (name.value = n)
  }

  return {
    name,
    uid,
    set,
  }
})
