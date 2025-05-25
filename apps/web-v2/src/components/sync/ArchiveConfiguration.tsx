import type { DateValue } from '@internationalized/date'
import type { FetchConfig, UserInfo } from '@weibo-archiver/core'
import { toDateValue } from '@weibo-archiver/core'
import {
  ArrowLeft,
  Calendar,
  Download,
  MessageSquare,
  Settings2,
  TextCursorInputIcon,
} from 'lucide-vue-next'
import { defineComponent, ref } from 'vue'
import DatePicker from '@/components/DatePicker.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface Option {
  label: string
  value: keyof FetchConfig
  remark: string
}

const options: Option[] = [
  {
    label: '导出全部微博',
    value: 'isFetchAll',
    remark: '导出全部微博，不限制时间范围',
  },
  {
    label: '包含转发的微博',
    value: 'hasRepost',
    remark: '导出微博时包含转发微博',
  },
  {
    label: '包含转发的图片',
    value: 'repostPic',
    remark: '包含转发微博中的图片',
  },
  {
    label: '包含评论',
    value: 'hasComment',
    remark: '导出微博时包含部分一级评论，暂不支持楼中楼',
  },
  {
    label: '继续上次的记录',
    value: 'restore',
    remark: '从上次终止的地方继续，不清除本地缓存',
  },
  {
    label: '导出收藏',
    value: 'hasFavorites',
    remark: '导出自己收藏的微博，对其他人无效',
  },
  {
    label: '导出微博',
    value: 'hasWeibo',
    remark: '',
  },
  {
    label: '导出关注列表',
    value: 'hasFollowings',
    remark: '',
  },
]

const ExportOptions = defineComponent({
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="space-y-1">
        {options.map(option => (
          <Label
            key={option.value}
            for={option.value}
            class="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50/80 transition-colors group"
          >
            <div class="flex-1 min-w-0">
              <div
                class="text-base font-medium cursor-pointer block"
              >
                {option.label}
              </div>
              {option.remark && (
                <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">
                  {option.remark}
                </p>
              )}
            </div>
            <div class="ml-4 flex-shrink-0">
              <Switch
                id={option.value}
                modelValue={props.config[option.value] || false}
                onUpdate:modelValue={(checked: boolean) => props.config[option.value] = checked}
              />
            </div>
          </Label>
        ))}
      </div>
    )
  },
})

const AdvancedSettings = defineComponent({
  props: {
    config: {
      type: Object as () => FetchConfig,
      required: true,
    },
  },
  setup(props) {
    const commentCounts = [
      { value: 5, label: '5 条' },
      { value: 10, label: '10 条' },
      { value: 15, label: '15 条' },
      { value: 20, label: '20 条' },
    ]

    const dateFrom = ref<DateValue>(toDateValue(props.config.startAt))
    const dateTo = ref<DateValue>(toDateValue(props.config.endAt))

    return () => (
      <div class="mt-4">
        <div class="flex items-center gap-2 py-2 border-b border-gray-100">
          <div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
            <Calendar class="w-4 h-4 text-orange-600" />
          </div>
          <h3 class="font-medium">高级设置</h3>
        </div>

        <div class="bg-gray-50/50 rounded-xl p-4 space-y-4">
          <div class="flex items-center gap-2">
            <MessageSquare class="w-5 h-5" />
            <Label class="text-base font-medium">评论获取数量</Label>
          </div>
          <Select
            disabled={!props.config.hasComment}
            defaultValue={5}
            modelValue={props.config.commentCount || 5}
            onUpdate:modelValue={val => props.config.commentCount = val as number}
          >
            <SelectTrigger class="w-full bg-white border-gray-200 rounded-xl">
              <SelectValue placeholder="选择评论数量" />
            </SelectTrigger>
            <SelectContent>
              {commentCounts.map(count => (
                <SelectItem
                  key={count.value}
                  value={count.value}
                >
                  {count.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div class="bg-gray-50/50 rounded-xl p-4 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Calendar class="w-5 h-5" />
              <Label class="text-base font-medium">导出的时间范围</Label>
            </div>
          </div>

          <div class="flex gap-4 flex-wrap">
            <div class="flex items-center gap-2">
              <Label class="text-sm">开始日期：</Label>
              <DatePicker
                disabled={props.config.isFetchAll}
                value={dateFrom.value}
                onUpdate:value={(val) => {
                  if (!val)
                    return
                  dateFrom.value = val
                  props.config.startAt = val?.toDate('Asia/Shanghai').getTime()
                }}
              />
            </div>
            <div class="flex items-center gap-2">
              <Label class="text-sm">结束日期：</Label>
              <DatePicker
                disabled={props.config.isFetchAll}
                value={dateTo.value}
                onUpdate:value={(val) => {
                  if (!val)
                    return
                  dateTo.value = val
                  props.config.endAt = val?.toDate('Asia/Shanghai').getTime()
                }}
              />
            </div>
          </div>
        </div>

        <div class="bg-gray-50/50 rounded-xl p-4 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <TextCursorInputIcon class="w-5 h-5" />
              <Label class="text-base font-medium">当前的游标信息</Label>
            </div>
          </div>

          <div>
            <Label
              class="mb-2 text-base"
            >
              页码
              {' '}
              <span class="text-xs text-muted-foreground">若不继续上次的记录，将重置为1</span>
            </Label>
            <Input
              type="number"
              modelValue={props.config.curPage || 1}
              onUpdate:modelValue={val => props.config.curPage = val as number}
              min={1}
            />
          </div>

          <div>
            <Label
              class="mb-2 text-base"
            >
              Since id
              <span class="text-xs text-muted-foreground">
                用于获取全部微博的重要参数，不能随意修改
              </span>
            </Label>
            <Input
              readonly
              disabled
              modelValue={props.config.sinceId || ''}
              onUpdate:modelValue={val => props.config.sinceId = val as string}
            />
          </div>
        </div>
      </div>
    )
  },
})

export const ArchiveConfiguration = defineComponent({
  props: {
    user: {
      type: Object as () => UserInfo,
    },
    config: {
      type: Object as () => FetchConfig,
      required: true,
    },
  },
  emits: ['startArchive', 'back'],
  setup(props, { emit }) {
    return () => (
      <Card class="p-0 mx-auto w-full sm:w-[80%]">
        <CardHeader
          class="pt-4 flex gap-4"
        >
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Settings2 class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <CardTitle class="text-xl font-semibold">
              爬取设置
            </CardTitle>
            <CardDescription class="text-sm">
              为
              {' '}
              <span class="text-primary font-bold">
                @
                {props.user?.name || '未设置用户'}
              </span>
              {' '}
              配置备份选项
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent class="px-4 py-0">
          <ExportOptions config={props.config} />
          <AdvancedSettings config={props.config} />
        </CardContent>

        <CardFooter class="p-6 bg-gray-50 border-t border-gray-100">
          <div class="flex items-center justify-between w-full">
            <Button
              onClick={() => emit('back')}
              variant="outline"
              class=" rounded-xl"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              上一步
            </Button>
            <Button
              onClick={() => emit('startArchive', props.config)}
              class=" bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl"
            >
              开始备份
              <Download class="w-4 h-4 mr-2" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  },
})
