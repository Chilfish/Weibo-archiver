import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  /**
   * 导出时隐藏控制面板
   */
  const showCtrl = ref(true)

  function setShowCtrl(value: boolean) {
    showCtrl.value = value
  }

  return {
    showCtrl,
    setShowCtrl,
  }
})
