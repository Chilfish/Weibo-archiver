import consola from 'consola'
import { defaultSavePath } from './config'
import { datePrompt, textPrompt } from './utils'

/**
 * 交互式输入，但可能还用不上😅
 */
export async function prompt() {
  const uid = await textPrompt('请输入微博用户的 uid：')
  const _savePath = await textPrompt(`请输入微博数据的保存路径，留空则使用默认值（${defaultSavePath}）：`)
    .then(v => v || defaultSavePath)
  const cookie = await textPrompt('请输入微博的 cookie：')

  const isFetchAll = await consola.prompt('是否抓取全部微博？', {
    type: 'confirm',
    initial: true,
  })

  let startAt = 0
  let endAt = 0
  if (!isFetchAll) {
    startAt = await datePrompt('请输入开始时间：')
    endAt = await datePrompt('请输入结束时间：')
  }

  consola.info({ uid, _savePath, cookie, isFetchAll, startAt, endAt })

  // config.value = {
  //   ...config.value,
  //   uid,
  //   savePath: _savePath,
  //   cookie,
  // }
}
