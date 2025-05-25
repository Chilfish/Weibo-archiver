import type { UserInfo } from '@weibo-archiver/core'
import { formatNumber } from '@weibo-archiver/core'
import { Loader2, Search, UserPlus, Users } from 'lucide-vue-next'
import { defineComponent, ref } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import Avatar from '@/components/common/Avatar.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const UserCard = defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object as () => UserInfo,
      required: true,
    },
    selected: Boolean,
  },
  setup(props) {
    return () => (
      <Label
        for={props.user.uid}
        class={cn(
          'flex gap-4 min-w-fit bg-card rounded-2xl p-4 shadow-sm border transition-all duration-300 cursor-pointer hover:border-orange-400',
          props.selected ? 'border-orange-400 ring-2 ring-orange-400/20' : 'border-gray-100',
        )}
      >
        <Avatar
          size="size-12"
          src={props.user.avatar}
        />

        <div class="flex-1">
          <div class="flex flex-col gap-2">
            <h4 class="font-semibold  truncate">
              @
              {props.user.name}
            </h4>
            <p class="text-sm truncate">
              {props.user.bio}
            </p>
          </div>

          <div class="flex items-center gap-6 mt-1 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <Users class="w-4 h-4" />
              <span class="font-medium">
                {formatNumber(props.user.followers)}
              </span>
              {' '}
              粉丝
            </span>
            <span class="flex items-center gap-1.5">
              <UserPlus class="w-4 h-4" />
              <span class="font-medium">
                {formatNumber(props.user.followings)}
              </span>
              {' '}
              关注
            </span>
          </div>
        </div>

        <Button
          variant={props.selected ? 'default' : 'outline'}
          class="rounded-xl"
        >
          <RadioGroupItem
            value={props.user.uid}
            id={props.user.uid}
            class="hidden"
          />
          <Label
            for={props.user.uid}
          >
            {props.selected ? '已选择' : '选择'}
          </Label>
        </Button>
      </Label>
    )
  },
})

export const UserSearch = defineComponent({
  name: 'UserSearch',
  emits: ['selectUser'],
  setup(props, { emit }) {
    const isSearching = ref(false)
    const searchResults = ref<UserInfo[]>([])
    const searchText = ref('')
    const selectedUid = ref('')

    const handleSearch = async (e: Event) => {
      e.preventDefault()
      emit('selectUser', undefined)
      if (!searchText.value)
        return

      isSearching.value = true
      searchResults.value = await sendMessage<UserInfo[]>('fetch:search-user', searchText.value)
      isSearching.value = false
    }

    const handleSelectUser = (uid: string) => {
      selectedUid.value = uid
      const user = searchResults.value.find(user => user.uid === uid)!
      emit('selectUser', user)
    }

    return () => (
      <div class="space-y-6 w-full">
        <form
          onSubmit={e => handleSearch(e)}
          class="flex gap-3 bg-card rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div
            class="relative flex-1"
          >
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="输入微博用户名或昵称..."
              modelValue={searchText.value}
              onUpdate:modelValue={val => searchText.value = val as string}
              class="pl-12 h-12 text-base border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400/20"
            />
          </div>
          <Button
            type="submit"
            disabled={!searchText.value || isSearching.value}
            class="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl"
          >
            {isSearching.value
              ? (
                  <>
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                    搜索中
                  </>
                )
              : (
                  '搜索用户'
                )}
          </Button>
        </form>

        {searchResults.value.length > 0 && (
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">搜索结果</h3>
            <RadioGroup
              modelValue={selectedUid.value}
              onUpdate:modelValue={handleSelectUser}
              class="grid gap-4 w-[70%] mx-auto"
            >
              {searchResults.value.map(user => (
                <UserCard
                  key={user.uid}
                  user={user}
                  selected={selectedUid.value === user.uid}
                />
              ))}
            </RadioGroup>
          </div>
        )}

        {searchText.value && !isSearching.value && !searchResults.value.length && (
          <div
            class="text-muted-foreground text-center"
          >
            若无搜索结果，可尝试使用用户的数字 uid
          </div>
        )}
      </div>
    )
  },
})
