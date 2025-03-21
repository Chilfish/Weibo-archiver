import type { Meta, StoryObj } from '@storybook/vue3'
import FilterBar from '../../components/FilterBar.vue'
import ProfilePanel from '../../components/ProfilePanel.vue'
import SwitchUser from '../../components/SwitchUser.vue'
import { users } from '../test.data'

const meta: Meta = {
  title: 'Pages/post',
}

export default meta

type Story = StoryObj<typeof meta>

const curUser = users[0]

export const Default: Story = {
  render: () => ({
    components: { FilterBar, ProfilePanel, SwitchUser },
    template: /* html */`
    <main class="flex flex-col p-4 h-screen">
      <FilterBar />
      <div class="flex gap-4">
        <div class="w-full bg-gray-400 h-150vh">
          微博列表
        </div>
        <div class="flex flex-col gap-4">
          <SwitchUser 
            class="w-full"
            :users="users" 
            :cur-uid="curUser.uid"
          />
          <ProfilePanel :user="curUser" />
        </div>
      </div>
    </main>
  `,
    setup() {
      return {
        curUser,
        users,
      }
    },
  }),
}

export const NoData: Story = {
  render: () => ({
    components: { FilterBar, ProfilePanel, SwitchUser },
    template: /* html */`
    <main class="flex flex-col p-4 h-screen">
      <FilterBar />
      <div class="flex gap-4">
        <div class="w-full bg-gray-400">
          引导用户导入数据
        </div>
        <div class="flex flex-col gap-4">
          <SwitchUser
            class="w-full"
            :users="[]"
          />
          <ProfilePanel :user="curUser" />
        </div>
      </div>
    </main>
  `,
  }),
}
