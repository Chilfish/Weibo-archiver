import type { InjectionKey } from 'vue'
import type { User } from '@types'

export const KeyUser = Symbol('user') as InjectionKey<User>
