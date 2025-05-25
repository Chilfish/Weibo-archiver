import type { FetchConfig, UserInfo } from '@weibo-archiver/core'
import {
  ArrowRightIcon,
  CheckCircle,
  Download,
  FileText,
  InfoIcon,
  Loader2,
  Users,
} from 'lucide-vue-next'
import { computed, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export type Status = 'fetching' | 'completed'

export const FetchStatus = defineComponent({
  props: {
    user: {
      type: Object as () => UserInfo,
      required: true,
    },
    config: {
      type: Object as () => FetchConfig,
      required: true,
    },
    status: {
      type: String as () => Status,
      default: 'fetching',
    },
    stats: {
      type: Object as () => {
        posts: number
        favorites: number
        followers: number
      },
      default: () => ({
        posts: 0,
        favorites: 0,
        followers: 0,
      }),
    },
    loggers: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  emits: ['download'],
  setup(props, { emit }) {
    const isCompleted = computed(() => props.status === 'completed')

    return () => (
      <Card class="gap-2 w-full sm:w-[80%]">
        <CardContent class="p-8 ">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
              {isCompleted.value
                ? (
                    <CheckCircle class="w-8 h-8 text-orange-600" />
                  )
                : (
                    <Loader2 class="w-8 h-8 text-orange-600 animate-spin" />
                  )}
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {isCompleted.value ? '备份完成！' : '正在备份中...'}
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: FileText, label: '微博', value: props.stats.posts, color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: Users, label: '收藏', value: props.stats.favorites, color: 'text-pink-600', bg: 'bg-pink-100' },
              { icon: FileText, label: '关注', value: props.stats.followers, color: 'text-red-600', bg: 'bg-red-100' },
            ].map((stat, index) => (
              <div key={index} class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center gap-3">
                  <div class={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon class={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-900 tabular-nums">
                      {stat.value.toLocaleString()}
                    </p>
                    <p class="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Alert class="mt-4">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              数据展示的是已经保存在本地中的数量
            </AlertDescription>
          </Alert>
        </CardContent>

        {/* TODO: loggers */}

        <CardFooter>
          {isCompleted.value && (
            <div class="flex items-center justify-between w-full">
              <Button
                variant="outline"
                class="rounded-xl"
                onClick={() => emit('download')}
              >
                <Download class="w-4 h-4 mr-2" />
                下载备份文件
              </Button>

              <Button
                asChild
                class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl"
              >
                <RouterLink to="/post?page=1">
                  查看已备份的微博
                  <ArrowRightIcon />
                </RouterLink>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    )
  },
})
