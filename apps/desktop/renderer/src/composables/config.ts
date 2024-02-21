import { _config } from '#preload'

console.log(_config)

const configRef = ref(_config.data)

_config.onChange((newVal) => {
  configRef.value = newVal
})

export {
  configRef,
  _config as config,
}
