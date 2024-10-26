import type { User } from '@shared'
import type { InjectionKey } from 'vue'

export const KeyUser = Symbol('user') as InjectionKey<User>
