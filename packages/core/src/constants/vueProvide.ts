import type { InjectionKey } from 'vue'
import type { User } from '~/src/types'

export const KeyUser = Symbol('user') as InjectionKey<User>
