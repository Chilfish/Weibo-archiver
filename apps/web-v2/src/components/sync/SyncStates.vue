<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import {
  Bookmark,
  CheckCircle,
  Clock,
  Heart,
  MessageCircle,
  Play,
  Zap,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'

// 定义爬取状态的类型
type CrawlStatus = 'idle' | 'crawling' | 'paused' | 'completed' | 'error'

// 定义爬取统计数据的类型
interface CrawlStats {
  weibo: number
  following: number
  favorites: number
}

// 定义 selectedUser 的类型 (假设它有一个 username 属性)
interface SelectedUser {
  username: string
  // ... 其他属性
}

// 假设 selectedUser 是从父组件传递下来的 prop 或者在同一个组件中定义
// 如果是 prop，需要这样定义：
// import { defineProps } from 'vue';
// const props = defineProps<{
//   selectedUser: SelectedUser | null;
// }>();
// const selectedUser = computed(() => props.selectedUser); // 如果是 prop，使用 computed

// 如果在同一个组件中定义，例如从上一个代码块传递过来：
const selectedUser = ref<SelectedUser | null>({ username: 'example_user' }) // 替换为你的实际 selectedUser 状态

// 响应式状态
const crawlStatus = ref<CrawlStatus>('idle')
const crawlStats = ref<CrawlStats>({
  weibo: 0,
  following: 0,
  favorites: 0,
})

// 计算属性判断是否正在爬取
const isCrawling = computed(() => crawlStatus.value === 'crawling')

// 用于模板中渲染统计数据的数组，包含图标组件类型
const crawlStatsDisplay = computed(() => [
  { label: '微博', value: crawlStats.value.weibo, icon: MessageCircle as FunctionalComponent, color: 'text-blue-600' },
  { label: '关注', value: crawlStats.value.following, icon: Heart as FunctionalComponent, color: 'text-red-600' },
  { label: '收藏', value: crawlStats.value.favorites, icon: Bookmark as FunctionalComponent, color: 'text-yellow-600' },
])

// 方法
const handleStartCrawl = () => {
  if (!selectedUser.value) {
    console.warn('未选择用户，无法开始获取')
    return
  }
  crawlStatus.value = 'crawling'
  // 模拟爬取过程
  console.log(`开始获取 @${selectedUser.value.username} 的数据...`)

  // 模拟数据更新
  const interval = setInterval(() => {
    if (crawlStatus.value !== 'crawling') {
      clearInterval(interval)
      return
    }
    crawlStats.value.weibo += Math.floor(Math.random() * 10)
    crawlStats.value.following += Math.floor(Math.random() * 2)
    crawlStats.value.favorites += Math.floor(Math.random() * 3)

    // 模拟完成
    if (crawlStats.value.weibo > 100 && crawlStats.value.following > 50 && crawlStats.value.favorites > 30) {
      clearInterval(interval)
      crawlStatus.value = 'completed'
      console.log('获取完成！')
    }
  }, 500)

  // 在组件卸载时清除定时器 (可选，取决于组件生命周期)
  // import { onUnmounted } from 'vue';
  // onUnmounted(() => {
  //   clearInterval(interval);
  // });
}

const setCrawlStatus = (status: CrawlStatus) => {
  crawlStatus.value = status
  if (status === 'paused') {
    console.log('获取已暂停')
  }
}
</script>

<template>
  <Card class="w-full p-0 border-2 border-[#ff8200]/20 shadow-xl">
    <CardHeader class="py-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
      <CardTitle class="flex items-center gap-3">
        <div class="p-3 bg-gradient-to-br from-[#ff8200] to-red-500 rounded-xl shadow-lg">
          <Zap class="h-6 w-6 text-white" />
        </div>
        <div>
          <div class="text-xl">
            开始获取数据
          </div>
          <div class="text-sm font-normal text-gray-600 dark:text-gray-400">
            {{ isCrawling ? "正在获取数据中..." : "一切准备就绪，点击开始获取" }}
          </div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="p-6 space-y-6">
      <!-- 实时获取统计 -->
      <div v-if="isCrawling" class="grid grid-cols-3 gap-4">
        <div
          v-for="stat in crawlStatsDisplay"
          :key="stat.label"
          class="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border"
        >
          <component :is="stat.icon" :class="`h-6 w-6 mx-auto mb-2 ${stat.color}`" />
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ stat.value }}
          </div>
          <div class="text-sm text-gray-500">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="flex gap-4">
        <Button
          :disabled="isCrawling"
          class="flex-1 h-14 text-lg bg-gradient-to-r from-[#ff8200] to-red-500 hover:from-[#e67300] hover:to-red-600 text-white shadow-lg"
          @click="handleStartCrawl"
        >
          <template v-if="isCrawling">
            <Clock class="mr-3 h-6 w-6 animate-spin" />
            获取中...
          </template>
          <template v-else>
            <Play class="mr-3 h-6 w-6" />
            开始获取 @{{ selectedUser?.username }} 的数据
          </template>
        </Button>
      </div>

      <div v-if="crawlStatus === 'completed'" class="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
        <CheckCircle class="h-12 w-12 text-green-600 mx-auto mb-3" />
        <h3 class="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
          获取完成！
        </h3>
        <p class="text-green-700 dark:text-green-300">
          成功获取了 @{{ selectedUser?.username }} 的数据，您可以在首页查看详细内容
        </p>
      </div>
    </CardContent>
  </Card>
</template>
