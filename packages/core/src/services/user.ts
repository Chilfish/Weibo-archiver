import type { User } from '../database/schema/user'
import type { UserDBMethods } from './../database/shared'

export class UserService implements UserDBMethods {
  // TODO: use fetch
  async getAllUsers() {
    return await fetch('/api/user/all').then(res => res.json())
  }

  async insertUser(newUser: User) {
    return await fetch('/api/user/add', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  }
}
