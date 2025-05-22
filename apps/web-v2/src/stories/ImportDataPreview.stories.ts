import type { Meta, StoryObj } from '@storybook/vue3'
import type { ImportedData } from '@weibo-archiver/core'
import ImportDataPreview from '@/components/common/ImportDataPreview'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { users } from './test.data'

const meta: Meta<typeof LazyImage> = {
  title: 'Components/ImportDataPreview',
  component: ImportDataPreview,
}

export default meta

type Story = StoryObj<typeof meta>

const importedData: ImportedData = {
  weibo: Array.from({ length: 100 }),
  followings: Array.from({ length: 20 }),
  favorites: Array.from({ length: 150 }),
  user: users[0],
}

export const Default: Story = {
  render: () => ({
    components: {
      ImportDataPreview,
      Dialog,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogContent,
      Button,
    },
    template: /* html */ `
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              确认导入数据
            </DialogTitle>
          </DialogHeader>

          <ImportDataPreview
            :data="data"
          />

          <DialogFooter
            class="flex items-center justify-end gap-3 p-4 border-t border-zinc-200 dark:border-zinc-800"
          >
            <Button variant="outline">
              取消
            </Button>
            <Button>
              确认导入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
    setup() {
      return {
        data: importedData,
      }
    },
  }),
}
