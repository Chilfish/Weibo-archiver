import type { Following } from '@weibo-archiver/core'
import { ArrowRightLeft, Check, Minus, Plus, X } from 'lucide-vue-next'
import { defineComponent, ref, toRaw, toRefs } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const SyncComparisonModal = defineComponent({
  name: 'SyncComparisonModal',
  props: {
    newFollowings: {
      type: Object as () => Following[],
      required: true,
    },
    removedFollowings: {
      type: Object as () => Following[],
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:isOpen', 'confirm'],
  setup(props, { emit }) {
    const { isOpen, removedFollowings, newFollowings } = toRefs(props)
    const selectedNewFollowings = ref<Following[]>([...newFollowings.value])
    const selectedRemovedFollowings = ref<Following[]>([...removedFollowings.value])

    const toggleNewFollowing = (following: Following) => {
      if (selectedNewFollowings.value.some(f => f.uid === following.uid)) {
        selectedNewFollowings.value = selectedNewFollowings.value.filter(f => f.uid !== following.uid)
      }
      else {
        selectedNewFollowings.value = ([...selectedNewFollowings.value, following])
      }
    }

    const toggleRemovedFollowing = (following: Following) => {
      if (selectedRemovedFollowings.value.some(f => f.uid === following.uid)) {
        selectedRemovedFollowings.value = (selectedRemovedFollowings.value.filter(f => f.uid !== following.uid))
      }
      else {
        selectedRemovedFollowings.value = ([...selectedRemovedFollowings.value, following])
      }
    }

    const selectAllNew = () => {
      selectedNewFollowings.value = ([...newFollowings.value])
    }

    const deselectAllNew = () => {
      selectedNewFollowings.value = ([])
    }

    const selectAllRemoved = () => {
      selectedRemovedFollowings.value = ([...removedFollowings.value])
    }

    const deselectAllRemoved = () => {
      selectedRemovedFollowings.value = ([])
    }

    const closeDialog = () => {
      isOpen.value = false
      emit('update:isOpen', false)
    }

    const handleConfirm = () => {
      emit('confirm', [
        selectedNewFollowings.value.map(toRaw),
        selectedRemovedFollowings.value.map(toRaw),
      ])
      closeDialog()
    }

    const SelectUser = ({
      following,
      toggleFn,
      isSelected,
    }: {
      following: Following
      toggleFn: (following: Following) => void
      isSelected: boolean
    }) => (
      <Label
        for={`new-${following.uid}`}
        key={following.uid}
        class={`flex items-center p-3 gap-2 rounded-lg border
         ${isSelected
        ? 'border-primary bg-orange-50 dark:bg-opacity-10'
        : 'border-gray-200 dark:border-gray-700'
      }
    `}
      >
        <Checkbox
          id={`new-${following.uid}`}
          modelValue={isSelected}
          onUpdate:modelValue={() => toggleFn(following)}
          class="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Avatar
          src={following.avatar}
          size="size-10"
        />
        <div class="font-medium truncate">
          {following.name}
        </div>
      </Label>
    )

    return () => (
      <Dialog
        onUpdate:open={closeDialog}
        open={isOpen.value}
      >
        <DialogContent
          class="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <DialogHeader>
            <DialogTitle class="text-xl flex items-center gap-2">
              <ArrowRightLeft class="h-5 w-5 text-primary" />
              同步变更确认
            </DialogTitle>

            <DialogDescription>
              请选择要保留的关注
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="new"
            class="flex-1 overflow-hidden flex flex-col"
          >
            <TabsList class="w-full grid grid-cols-2">
              <TabsTrigger
                value="new"
                class="flex items-center gap-1"
              >
                <Plus class="h-4 w-4 text-green-600" />
                新增关注 (
                {selectedNewFollowings.value.length}
                /
                {newFollowings.value.length}
                )
              </TabsTrigger>
              <TabsTrigger
                value="removed"
                class="flex items-center gap-1"
              >
                <Minus class="h-4 w-4 text-red-600" />
                移除关注 (
                {selectedRemovedFollowings.value.length}
                /
                {removedFollowings.value.length}
                )
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="new"
              class="flex-1 overflow-hidden flex flex-col mt-0 border-0 p-0"
            >
              <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800">
                <span class="text-sm font-medium">
                  选择要添加的新关注
                </span>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllNew}
                  >
                    全选
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAllNew}
                  >
                    取消全选
                  </Button>
                </div>
              </div>
              <div class="overflow-y-auto flex-1 p-1">
                {newFollowings.value.length === 0
                  ? (
                      <div class="flex items-center justify-center h-full text-gray-500">
                        没有新增关注
                      </div>
                    )
                  : (
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {newFollowings.value.map(following => (
                          <SelectUser
                            toggleFn={toggleNewFollowing}
                            following={following}
                            isSelected={selectedNewFollowings.value.some(f => f.uid === following.uid)}
                          />
                        ))}
                      </div>
                    )}
              </div>
            </TabsContent>

            <TabsContent
              value="removed"
              class="flex-1 overflow-hidden flex flex-col mt-0 border-0 p-0"
            >
              <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800">
                <span class="text-sm font-medium">
                  选择要保留的被移除关注
                </span>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllRemoved}
                  >
                    全选
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAllRemoved}
                  >
                    取消全选
                  </Button>
                </div>
              </div>
              <div class="overflow-y-auto flex-1 p-1">
                {removedFollowings.value.length === 0
                  ? (
                      <div class="flex items-center justify-center h-full text-gray-500">
                        没有移除关注
                      </div>
                    )
                  : (
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {removedFollowings.value.map(following => (
                          <SelectUser
                            toggleFn={toggleRemovedFollowing}
                            following={following}
                            isSelected={selectedRemovedFollowings.value.some(f => f.uid === following.uid)}
                          />
                        ))}
                      </div>
                    )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter
            class="flex justify-between items-center pt-4 border-t"
          >
            <div class="text-xs text-gray-500 mr-auto">
              将保留
              {' '}
              {selectedNewFollowings.value.length}
              {' '}
              个新关注，
              {selectedRemovedFollowings.value.length}
              {' '}
              个关注被移除
            </div>
            <div class="flex gap-2">
              <Button
                variant="outline"
                onClick={closeDialog}
              >
                <X class="h-4 w-4 mr-1" />
                取消
              </Button>
              <Button
                class="bg-primary hover:bg-[#e67300] text-white"
                onClick={handleConfirm}
              >
                <Check class="h-4 w-4 mr-1" />
                确认更新
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
})

export default SyncComparisonModal
