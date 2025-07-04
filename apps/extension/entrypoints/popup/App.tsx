import { AlertCircle, ExternalLink } from 'lucide-react'
import { browser } from 'wxt/browser'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  useAppInitialization,
  useRealTimeUpdate,
  useTaskStatusUpdater,
} from '@/hooks'
import { useTaskStore, useUIStore } from '@/lib/stores'
import { AddTaskDialog, SettingsDialog, TaskList } from './components'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { AppHeader } from './components/AppHeader'

function AppContent() {
  const { isLoading, error, clearError } = useTaskStore()
  const { cookieStatus } = useUIStore()

  // 初始化应用
  useAppInitialization()

  // 定期更新任务状态
  useTaskStatusUpdater()

  // 实时更新时间
  const currentTime = useRealTimeUpdate(1000)

  if (isLoading) {
    return (
      <div className="w-96 h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">正在加载...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-96 pb-4 overflow-hidden bg-background">
      <div className="flex flex-col h-full px-3">
        <AppHeader />

        {/* Cookie 状态提示 */}
        {cookieStatus && !cookieStatus.valid && (
          <Alert className="mb-3 mx-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              请先登录微博网站，然后刷新此页面
              <Button
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

        {/* 错误提示 */}
        {error && (
          <Alert variant="destructive" className="mb-3 mx-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto ml-2 text-destructive-foreground"
                onClick={clearError}
              >
                关闭
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <TaskList />
      </div>

      {/* 对话框 */}
      <AddTaskDialog />
      <SettingsDialog />
    </div>
  )
}

function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  )
}

export default App
