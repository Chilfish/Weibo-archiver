import { createStorage } from 'unstorage'
import indexedDbDriver from 'unstorage/drivers/indexedb'

export const indexDB = createStorage({
  driver: indexedDbDriver({ base: 'app:' }),
})
