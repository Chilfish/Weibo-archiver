import type { InjectionKey } from 'vue'
import type { User } from '@shared'

export const KeyUser = Symbol('user') as InjectionKey<User>
