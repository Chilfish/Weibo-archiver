<script setup lang="ts">
import Setting from '@/components/settings/Settings.vue'
import SwitchUser from '@/components/SwitchUser.vue'
import { useUserStore } from '@/stores'
import {
  Album,
  Bookmark,
  Heart,
  History,
  Home,
  Search,
  Settings,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Menu items.
const items = [
  {
    title: '首页',
    url: '/post',
    icon: Home,
  },
  {
    title: '搜索',
    url: '/search',
    icon: Search,
  },
  {
    title: '相册',
    url: '/album',
    icon: Album,
  },
  {
    title: '收藏',
    url: '/bookmarks',
    icon: Bookmark,
  },
  {
    title: '那年今日',
    url: '/memos',
    icon: History,
  },
  {
    title: '关注列表',
    url: '/followings',
    icon: Heart,
  },
]

const route = useRoute()
const pathName = computed(() => route.path)

const userStore = useUserStore()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SwitchUser
            v-model:cur-uid="userStore.curUid"
            :users="userStore.users"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in items"
              :key="item.title"
            >
              <SidebarMenuButton
                :is-active="item.url === pathName"
                as-child
              >
                <RouterLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <Dialog>
                  <DialogTrigger class="w-full">
                    <Button
                      variant="ghost"
                      class="w-full justify-start p-2!"
                    >
                      <Settings />
                      <span>设置</span>
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    class="sm:max-w-fit"
                    :show-close="false"
                  >
                    <Setting />
                  </DialogContent>
                </Dialog>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
