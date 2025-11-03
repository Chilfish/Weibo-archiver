import { Clock, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTaskOperations } from '@/hooks'
import { useTaskStore, useUIStore } from '@/lib/stores'
import { formatInterval } from '@/lib/utils'

const INTERVAL_OPTIONS = [
  { value: 15, label: '15 分钟' },
  { value: 30, label: '30 分钟' },
  { value: 60, label: '1 小时' },
  { value: 120, label: '2 小时' },
  { value: 360, label: '6 小时' },
  { value: 720, label: '12 小时' },
  { value: 1440, label: '24 小时' },
]

export function EditTaskDialog() {
  const { showEditTaskDialog, setShowEditTaskDialog, editingTaskId }
    = useUIStore()

  const { tasks } = useTaskStore()
  const { handleUpdateTask } = useTaskOperations()

  const [interval, setInterval] = useState(30)
  const [isLoading, setIsLoading] = useState(false)

  // 获取当前编辑的任务
  const task = tasks.find(t => t.id === editingTaskId)

  // 重置状态
  useEffect(() => {
    if (showEditTaskDialog && task) {
      setInterval(task.interval)
      setIsLoading(false)
    }
  }, [showEditTaskDialog, task])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!task)
      return

    try {
      setIsLoading(true)
      await handleUpdateTask(task.id, { interval })
      setShowEditTaskDialog(false)
    }
    catch (error) {
      console.error('Failed to save task:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShowEditTaskDialog(false)
  }

  const hasChanged = task && interval !== task.interval

  return (
    <Dialog open={showEditTaskDialog} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑任务设置</DialogTitle>
          <DialogDescription>
            修改
            {' '}
            {task?.username}
            {' '}
            的备份任务设置
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 用户信息显示 */}
          {task && (
            <div className="p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{task.username}</span>
                <span className="text-sm text-muted-foreground">
                  UID:
                  {' '}
                  {task.uid}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                已备份:
                {' '}
                {task.totalPosts.toLocaleString()}
                {' '}
                条微博
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

          {/* 变更提示 */}
          {hasChanged && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                检查间隔将从
                {' '}
                {formatInterval(task.interval)}
                {' '}
                更改为
                {' '}
                {formatInterval(interval)}
                <br />
                下次运行时间将根据新的间隔重新计算
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit" disabled={!hasChanged || isLoading}>
              {isLoading ? '保存中...' : '保存设置'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
