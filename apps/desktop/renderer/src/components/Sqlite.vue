<script setup lang="ts">
import type { IAccessor } from '@types'
import type { DBMethods, UserTable } from '@database'

const { userService } = defineProps<{
  userService: IAccessor<DBMethods>
}>()

const users = ref([] as UserTable[])

async function createUser() {
  const user = {
    name: 'John Doe',
    email: 'jogn@mail.com',
  }

  const newUser = await userService.send('addUser', user)
  users.value.push(newUser)
}

onMounted(async () => {
  const data = await userService.send('getAllUsers')
  users.value = data
})
</script>

<template>
  <div class="flex flex-col">
    <p>Use Sqlite3 </p>

    <div>
      <span> All users:</span>
      <button
        class="ml-2 rounded-md bg-blue-500 px-2 py-1 text-white"
        @click="createUser"
      >
        Create user
      </button>
    </div>

    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.id }} - {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
