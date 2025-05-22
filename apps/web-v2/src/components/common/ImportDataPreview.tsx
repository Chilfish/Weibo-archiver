import type { ImportedData, UserInfo } from '@weibo-archiver/core'
import { defineComponent } from 'vue'
import { Badge } from '@/components/ui/badge'
import Avatar from './Avatar.vue'

const ImportedUser = ({ user }: { user: UserInfo }) => (
  <div class="w-full flex gap-4">
    <Avatar
      size="size-12"
      src={user.avatar}
    />
    <div class="flex flex-col gap-2">
      <span
        class="font-bold"
      >
        {user.name}
        <Badge
          class="text-xs"
          variant="secondary"
        >
          UID:
          {user.uid}
        </Badge>
      </span>
      <p
        class="text-muted-foreground text-sm"
      >
        {user.bio}
      </p>
    </div>
  </div>
)

export const ImportDataPreview = defineComponent({
  name: 'ImportDataPreview',
  props: {
    data: {
      type: Object as () => ImportedData,
      required: true,
    },
  },
  setup({ data }) {
    return () => (
      <main>
        <ImportedUser user={data.user} />
      </main>
    )
  },
})

export default ImportDataPreview
