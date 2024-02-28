export const configRef = ref(window.config.data)

window.config.onChange((newVal) => {
  configRef.value = newVal
})
