import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from '../components/common/Pagination.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    total: {
      type: 'number',
    },
    current: {
      type: 'number',
    },
    pageSize: {
      type: 'number',
    },
    showEndPage: {
      type: 'boolean',
    },
    showJump: {
      type: 'boolean',
    },
    showTotal: {
      type: 'boolean',
    },
    showSizeChanger: {
      type: 'boolean',
    },
  },
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showEndPage: true,
    showJump: true,
    showTotal: true,
    showSizeChanger: true,
  },
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: args => ({
    components: {
      Pagination,
    },
    template: /* html */`
    <div class="p-6">
      <Pagination
        v-model:current="current"
        v-model:page-size="pageSize"
        :total="args.total"
        :show-end-page="args.showEndPage"
        :show-jump="args.showJump"
        :show-total="args.showTotal"
        :show-size-changer="args.showSizeChanger"
      />
    </div>
    `,
    setup() {
      const current = ref(args.current)
      const pageSize = ref(args.pageSize)
      return {
        args,
        current,
        pageSize,
      }
    },
  }),
}
