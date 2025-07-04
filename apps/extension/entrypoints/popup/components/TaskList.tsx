import type { TaskConfig, TaskStatus } from '@/types/storage'
import {
  AlertCircle,
  Calendar,
  Clock,
  Download,
  Edit,
  MoreVertical,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  formatTimeRemaining,
  getTimeStatusColor,
  useRealTimeUpdate,
  useTaskOperations,
} from '@/hooks'
import { imgCdn } from '@/lib/constants'
import { formatInterval } from '@/lib/messaging'
import { useTaskStore, useUIStore } from '@/lib/stores'
import { formatDate } from '@/lib/utils/format'
import { EditTaskDialog } from './EditTaskDialog'

interface TaskItemProps {
  task: TaskConfig
  status?: TaskStatus
}

function TaskItem({ task, status }: TaskItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { setShowEditTaskDialog } = useUIStore()
  const { handleRemoveTask, handleExportTask } = useTaskOperations()
  const currentTime = useRealTimeUpdate(1000)

  const isRunning = status?.status === 'running'
  const hasError = status?.status === 'error'

  const handleDelete = async () => {
    await handleRemoveTask(task.id)
    setShowDeleteDialog(false)
  }

  const handleEdit = () => {
    setShowEditTaskDialog(true, task.id)
  }

  const handleExport = async () => {
    await handleExportTask(task.id)
  }

  const getNextRunTime = () => {
    if (!task.nextRunTime || task.nextRunTime === 0)
      return { text: '未设置', color: 'text-muted-foreground' }

    const text = formatTimeRemaining(task.nextRunTime, currentTime)
    const color = getTimeStatusColor(task.nextRunTime, currentTime)

    return { text, color }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`${imgCdn}${task.avatar}`}
                  alt={task.username}
                />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-sm truncate">
                    @
                    {task.username}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  UID:
                  {' '}
                  {task.uid}
                  {' '}
                  • 间隔:
                  {' '}
                  {formatInterval(task.interval)}
                  {task.isFirstBackup && ' • 首次备份仅获取最近一天'}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleExport}
                    disabled={task.isFirstBackup || task.totalPosts === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    导出备份数据
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    编辑设置
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除任务
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{task.isFirstBackup ? '待备份' : '总微博数'}</span>
              </div>
              <div className="font-medium">
                {task.isFirstBackup
                  ? '未开始'
                  : task.totalPosts.toLocaleString()}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>下次运行</span>
              </div>
              <div className={`font-medium ${getNextRunTime().color}`}>
                {getNextRunTime().text}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>最后检查</span>
              </div>
              <div className="font-medium">
                {task.lastCheck ? formatDate(task.lastCheck) : '从未'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>添加时间</span>
              </div>
              <div className="font-medium">{formatDate(task.addedAt)}</div>
            </div>
          </div>

          {/* 错误信息显示 */}
          {hasError && status?.message && (
            <>
              <Separator className="my-3" />
              <div className="flex items-center justify-center">
                <div
                  className="text-xs text-destructive text-center"
                  title={status.message}
                >
                  <AlertCircle className="h-4 w-4 mx-auto mb-1" />
                  {status.message}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除任务</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除用户
              {' '}
              <strong>{task.username}</strong>
              {' '}
              的备份任务吗？
              此操作不可撤销，但已备份的数据不会被删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function TaskList() {
  const { tasks, taskStatuses } = useTaskStore()

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold mb-2">暂无备份任务</h3>
        <p className="text-sm text-muted-foreground mb-4">
          点击上方的"添加任务"按钮开始备份微博数据
        </p>
      </div>
    )
  }

  // 按状态排序
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusA = taskStatuses[a.id]
    const statusB = taskStatuses[b.id]

    // 运行中的任务排在前面
    if (statusA?.status === 'running' && statusB?.status !== 'running')
      return -1
    if (statusB?.status === 'running' && statusA?.status !== 'running')
      return 1

    // 按添加时间倒序
    return b.addedAt - a.addedAt
  })

  return (
    <div className="space-y-2 h-full overflow-auto">
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} status={taskStatuses[task.id]} />
      ))}
      <EditTaskDialog />
    </div>
  )
}
