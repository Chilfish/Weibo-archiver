import type { ImportedData, UserInfo } from '@weibo-archiver/core'
import {
  AlertCircleIcon,
  BookmarkIcon,
  InfoIcon,
  NewspaperIcon,
  UsersRoundIcon,
} from 'lucide-vue-next'
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores'
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
          class="text-xs ml-2"
          variant="outline"
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

const ImportedSize = (props: {
  weibo: number
  followings: number
  favorites: number
}) => (
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg py-2 px-4">
      <div class="flex items-center gap-2 mb-1">
        <NewspaperIcon class="h-4 w-4 text-orange-500" />
        <span class="font-medium">微博</span>
      </div>
      <p class="text-2xl font-bold">{props.weibo}</p>
    </div>
    <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg py-2 px-4">
      <div class="flex items-center gap-2 mb-1">
        <UsersRoundIcon class="h-4 w-4 text-orange-500" />
        <span class="font-medium">关注</span>
      </div>
      <p class="text-2xl font-bold">{props.followings}</p>
    </div>
    <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg py-2 px-4">
      <div class="flex items-center gap-2 mb-1">
        <BookmarkIcon class="h-4 w-4 text-orange-500" />
        <span class="font-medium">收藏</span>
      </div>
      <p class="text-2xl font-bold">{props.favorites}</p>
    </div>
  </div>
)

const SelectImportedUser = defineComponent({
  name: 'SelectImportedUser',
  props: {
    user: {
      type: Object as () => UserInfo,
      required: true,
    },
    existingUsers: {
      type: Object as () => Array<UserInfo>,
      required: true,
    },
  },
  emits: ['selectedUid'],
  setup({ user, existingUsers }, { emit }) {
    const matchingUser = computed(() => existingUsers.findIndex(localUser => localUser.uid === user.uid) !== -1)
    const selectedUid = ref<string>(user.uid)

    onBeforeMount(async () => {
      if (!matchingUser.value) {
        selectedUid.value = ''
      }
    })

    watch(selectedUid, () => emit('selectedUid', selectedUid.value), { immediate: true })

    return () => (
      <section class="mt-6">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="font-medium">选择导入方式</h3>
          {matchingUser.value && (
            <Badge
              variant="outline"
              class="text-xs bg-green-50 text-green-700 border-green-200"
            >
              找到匹配用户
            </Badge>
          )}
        </div>

        <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 mb-2">
          <RadioGroup
            modelValue={selectedUid.value}
            onUpdate:modelValue={(uid: string) => selectedUid.value = uid}
          >
            <Label
              for="new-user"
              class={cn(
                'flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors',
                selectedUid.value === ''
                  ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30'
                  : '',
              )}
            >
              <RadioGroupItem value="" id="new-user" class="mt-1" />
              <div class="space-y-1">
                <div class="font-medium">
                  创建新用户
                </div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">
                  将导入的数据作为新用户保存，不与现有数据合并
                </p>
              </div>
            </Label>

            {existingUsers.length > 0 && (
              <div
                class="font-medium text-zinc-500 text-sm"
              >
                <Separator class="my-2" />
                合并到现有用户
              </div>
            )}

            {existingUsers.map(existingUser => (
              <Label
                key={existingUser.uid}
                class={cn(
                  'flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors',
                  existingUser.uid === selectedUid.value
                    ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30'
                    : '',
                )}
                for={`user-${existingUser.uid}`}
              >
                <RadioGroupItem
                  value={existingUser.uid}
                  id={`user-${existingUser.uid}`}
                />
                <div
                  class="font-medium flex items-center gap-2"
                >
                  <Avatar src={existingUser.avatar} />
                  <div>
                    <p>
                      {existingUser.name}
                    </p>
                    <p
                      class="text-xs mt-1 text-zinc-500 dark:text-zinc-400"
                    >
                      UID:
                      {existingUser.uid}
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>

          {selectedUid.value && (
            <div
              class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300"
            >
              <div class="flex items-start gap-2">
                <InfoIcon class="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-medium">合并策略</p>
                  <p
                    class="mt-1"
                  >
                    将新数据追加到现有数据中，如有重复内容则使用新数据替换旧数据。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {
          !selectedUid.value && (
            <div
              class="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-lg mb-6"
            >
              <AlertCircleIcon class="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-medium">将创建新用户数据</p>
                <p
                  class="text-sm mt-1"
                >
                  导入的数据将作为新用户保存，不会与现有数据合并。
                </p>
              </div>
            </div>
          )
        }
      </section>
    )
  },
})

export const ImportDataPreview = defineComponent({
  name: 'ImportDataPreview',
  props: {
    data: {
      type: Object as () => ImportedData,
      required: true,
    },
  },
  emits: ['selectedUid'],
  setup({ data }, { emit }) {
    const userStore = useUserStore()

    const existingUsers = ref<UserInfo[]>([])

    onBeforeMount(async () => {
      existingUsers.value = await userStore.getAllUsers()
    })

    return () => (
      <main
        class="space-y-4"
      >
        <ImportedUser user={data.user} />
        <ImportedSize
          weibo={data.weibo.length}
          followings={data.followings.length}
          favorites={data.favorites.length}
        />
        <SelectImportedUser
          key={existingUsers.value.length}
          user={data.user}
          existingUsers={existingUsers.value}
          onSelectedUid={(uid: string) => emit('selectedUid', uid)}
        />
      </main>
    )
  },
})

export default ImportDataPreview
