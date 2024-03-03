import { defineStore } from 'pinia'

export const usePublicStore = defineStore('public', () => {
  const globalImg = ref('')

  return {
    globalImg,
  }
})
