import { config } from '#preload'

const configRef = ref(config.data)

config.onChange((newVal) => {
  configRef.value = newVal
})

export {
  configRef,
  config,
}
