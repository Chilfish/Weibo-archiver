import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Dialog from '../components/common/Dialog.vue'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => ({
    components: { Dialog },
    template: '<Dialog open />',
  }),
}

export const WithTitleMessage: Story = {
  render: () => ({
    components: { Dialog },
    template: `
    <Dialog
      title="Hello"
      message="This is a dialog"
      v-model:open="open"
     />
     <button class="btn" @click="showModal">open modal</button>
    `,
    setup() {
      const open = ref(false)
      const showModal = () => {
        open.value = true
      }
      return { open, showModal }
    },
  }),
}

export const WithButtons: Story = {
  render: () => ({
    components: { Dialog },
    template: `
    <Dialog title="Hello" 
    message="This is a dialog"
    :show-confirm="true"
    v-model:open="open"
    />
    <button class="btn" @click="showModal">open modal</button>
    `,
    setup() {
      const open = ref(false)
      const showModal = () => {
        open.value = true
      }
      return { open, showModal }
    },
  }),
}

export const WithSlot: Story = {
  render: () => ({
    components: { Dialog },
    template: `
    <Dialog title="Hello" message="This is a dialog" v-model:open="open">
      <button class="btn">Click me</button>
    </Dialog>

    <button class="btn" @click="showModal">open modal</button>
    `,
    setup() {
      const open = ref(false)
      const showModal = () => {
        open.value = true
      }
      return { open, showModal }
    },
  }),
}
