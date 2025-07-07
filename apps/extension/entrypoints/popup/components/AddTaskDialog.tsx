import type { UserInfo } from '@weibo-archiver/core'
import type { TaskConfig } from '@/types/storage'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { browser } from 'wxt/browser'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useTaskOperations } from '@/hooks'
import { DEFAULT_TASK_CONFIG, imgCdn } from '@/lib/constants'
import { useUIStore } from '@/lib/stores'
import {
  formatInterval,
  generateTaskId,
  parseWeiboUrl,
  popupBackgroundClient,
} from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface UserPreview {
  userInfo: UserInfo
  isValid: boolean
  error?: string
}

const INTERVAL_OPTIONS = [
  { value: 2, label: '2 分钟' },
  { value: 15, label: '15 分钟' },
  { value: 30, label: '30 分钟' },
  { value: 60, label: '1 小时' },
  { value: 720, label: '12 小时' },
  { value: 1440, label: '24 小时' },
]

export function AddTaskDialog() {
  const { showAddTaskDialog, setShowAddTaskDialog, cookieStatus }
    = useUIStore()
  const { handleAddTask } = useTaskOperations()

  const [url, setUrl] = useState('')
  const [interval, setInterval] = useState(30)
  const [userPreview, setUserPreview] = useState<UserPreview | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 重置状态
  useEffect(() => {
    if (!showAddTaskDialog) {
      setUrl('')
      setInterval(30)
      setUserPreview(null)
      setIsLoading(false)
      setError('')
    }
  }, [showAddTaskDialog])

  // 当URL变化时，延迟获取用户信息
  useEffect(() => {
    const timer = setTimeout(() => {
      if (url.trim()) {
        fetchUserInfo()
      }
      else {
        setUserPreview(null)
        setError('')
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [url])

  async function fetchUserInfo() {
    try {
      setIsLoading(true)
      setError('')
      setUserPreview(null)

      const parsedUrl = parseWeiboUrl(url.trim())
      if (!parsedUrl) {
        setError('无效的微博用户链接')
        return
      }

      const uid = parsedUrl.uid

      // 如果是用户名，需要先获取 UID
      if (!uid && parsedUrl.username) {
        setError('暂不支持通过用户名添加，请使用包含 UID 的链接')
        return
      }

      if (!uid) {
        setError('无法从链接中提取用户 UID')
        return
      }

      // 获取用户信息
      const userInfo = await popupBackgroundClient.getUserInfo({ uid })

      setUserPreview({
        userInfo,
        isValid: true,
      })
    }
    catch (error) {
      console.error('Failed to fetch user info:', error)
      setError(`获取用户信息失败：${(error as Error).message}`)
      setUserPreview(null)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userPreview?.isValid) {
      setError('请先输入有效的微博用户链接')
      return
    }

    if (!cookieStatus?.valid) {
      setError('请先登录微博账号')
      return
    }

    try {
      const now = Date.now()
      const taskConfig: TaskConfig = {
        ...DEFAULT_TASK_CONFIG,
        id: generateTaskId(userPreview.userInfo.uid),
        uid: userPreview.userInfo.uid,
        username: userPreview.userInfo.name,
        avatar: userPreview.userInfo.avatar,
        url: url.trim(),
        addedAt: now,
        interval,
        nextRunTime: now + 10 * 1000, // 10秒后开始首次备份
      }

      await handleAddTask(taskConfig)
    }
    catch (error) {
      setError(`添加任务失败：${(error as Error).message}`)
    }
  }

  const getSampleUrls = () => [
    'https://weibo.com/u/1234567890',
    'https://m.weibo.cn/u/1234567890',
    'https://m.weibo.cn/profile/1234567890',
  ]

  return (
    <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
      <DialogContent className="h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>添加备份任务</DialogTitle>
          <DialogDescription>
            输入微博用户链接，系统将自动获取用户信息并创建备份任务
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cookie 状态检查 */}
          {!cookieStatus?.valid && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                请先登录微博网站
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="p-0 h-auto ml-2"
                  onClick={() =>
                    browser.tabs.create({ url: 'https://weibo.com' })}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  打开微博
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* URL 输入 */}
          <div className="space-y-2">
            <Label htmlFor="url">微博用户链接</Label>
            <div className="relative">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={!cookieStatus?.valid}
                className="pr-10"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LoadingSpinner size="sm" />
                </div>
              )}
              {userPreview?.isValid && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>

            {/* 支持的链接格式说明 */}
            <div className="text-xs text-muted-foreground">
              <div className="mb-1">支持的链接格式：</div>
              <ul className="space-y-1 ml-2">
                {getSampleUrls().map((sampleUrl, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <span>•</span>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {sampleUrl}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 用户预览 */}
          {userPreview?.isValid && (
            <div className="space-y-2">
              <Label>用户预览</Label>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`${imgCdn}${userPreview.userInfo.avatar}`}
                    alt={userPreview.userInfo.name}
                  />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">
                      {userPreview.userInfo.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      UID:
                      {' '}
                      {userPreview.userInfo.uid}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span>
                      关注:
                      {' '}
                      {userPreview.userInfo.followings.toLocaleString()}
                    </span>
                    <span>
                      粉丝:
                      {' '}
                      {userPreview.userInfo.followers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 检查间隔设置 */}
          <div className="space-y-2">
            <Label htmlFor="interval">检查间隔</Label>
            <Select
              value={interval.toString()}
              onValueChange={value => setInterval(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INTERVAL_OPTIONS.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-xs text-muted-foreground">
              系统将每隔
              {' '}
              {formatInterval(interval)}
              {' '}
              自动检查并备份新的微博内容
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Separator />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddTaskDialog(false)}
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={
                !userPreview?.isValid || !cookieStatus?.valid || isLoading
              }
            >
              {isLoading
                ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      获取中...
                    </>
                  )
                : (
                    '添加任务'
                  )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
