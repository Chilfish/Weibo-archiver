import { CheckCircle, Plus, Send, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSendToWeb } from '@/hooks'
import { useUIStore } from '@/lib/stores'

export function AppHeader() {
  const { setShowAddTaskDialog, setShowSettingsDialog } = useUIStore()
  const { sendToWeb, isSending, lastSendTime, clearError } = useSendToWeb()

  const handleSendDataToWeb = async () => {
    await sendToWeb()
  }

  const getSendButtonContent = () => {
    if (isSending) {
      return (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </>
      )
    }

    if (lastSendTime && Date.now() - lastSendTime < 3000) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }

    return <Send className="h-4 w-4" />
  }

  const getTooltipContent = () => {
    if (isSending)
      return '正在发送数据...'
    if (lastSendTime && Date.now() - lastSendTime < 3000)
      return '数据发送成功！'

    return (
      <p>
        同步所有备份数据到
        <a
          href="https://weibo-archiver.chilfish.top/post?page=1"
          target="_blank"
          className="mx-1 underline-offset-2 underline"
          rel="noopener"
        >
          网页端
        </a>
        （需要在网页端进行）
      </p>
    )
  }

  const getButtonVariant = () => {
    if (lastSendTime && Date.now() - lastSendTime < 3000)
      return 'default' as const
    return 'outline' as const
  }

  const getButtonClassName = () => {
    const baseClass = 'transition-colors duration-200'

    if (isSending)
      return `${baseClass} opacity-70`
    return baseClass
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">微博自动备份</h1>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={getButtonVariant()}
                size="sm"
                onClick={handleSendDataToWeb}
                onMouseEnter={clearError}
                disabled={isSending}
                className={getButtonClassName()}
              >
                {getSendButtonContent()}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">{getTooltipContent()}</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setShowAddTaskDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            添加任务
          </Button>
        </div>
      </div>
    </div>
  )
}
