import type React from 'react'
import type { AppConfig } from '@/types/storage'
import {
  AlertCircle,
  Download,
  HardDrive,
  Trash2,
  Upload,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/animate-ui/radix/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
import { useConfigOperations } from '@/hooks'
import { useConfigStore, useUIStore } from '@/lib/stores'

const RETRY_OPTIONS = [
  { value: 1, label: '1 次' },
  { value: 2, label: '2 次' },
  { value: 3, label: '3 次' },
  { value: 5, label: '5 次' },
]

export function SettingsDialog() {
  const { showSettingsDialog, setShowSettingsDialog } = useUIStore()
  const { config, error } = useConfigStore()
  const {
    handleSaveSettings,
    handleExportData,
    handleExportAllBackupData,
    handleImportData,
    handleClearAllData,
  } = useConfigOperations()

  const [formData, setFormData] = useState<AppConfig>(config)
  const [showClearDataDialog, setShowClearDataDialog] = useState(false)
  const [exportError, setExportError] = useState('')
  const [importError, setImportError] = useState('')

  // 重置表单数据
  useEffect(() => {
    if (showSettingsDialog) {
      setFormData(config)
      setExportError('')
      setImportError('')
    }
  }, [showSettingsDialog, config])

  const handleSave = async () => {
    await handleSaveSettings(formData)
  }

  const handleExport = async () => {
    try {
      setExportError('')
      await handleExportData()
    }
    catch (error) {
      setExportError(`导出失败：${(error as Error).message}`)
    }
  }

  const handleExportAllBackup = async () => {
    try {
      setExportError('')
      await handleExportAllBackupData()
    }
    catch (error) {
      setExportError(`导出备份数据失败：${(error as Error).message}`)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file)
      return

    try {
      setImportError('')
      await handleImportData(file)
    }
    catch (error) {
      setImportError(`导入失败：${(error as Error).message}`)
    }

    // 清空文件输入
    event.target.value = ''
  }

  const handleClearData = async () => {
    await handleClearAllData()
    setShowClearDataDialog(false)
  }

  const handleClose = () => {
    setShowSettingsDialog(false)
  }

  return (
    <Dialog open={showSettingsDialog} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>应用设置</DialogTitle>
          <DialogDescription>
            配置微博自动备份的全局设置和首选项
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="backup">
          <TabsList className="grid grid-cols-2 mb-4 mx-auto">
            <TabsTrigger value="backup">备份设置</TabsTrigger>
            <TabsTrigger value="data">数据管理</TabsTrigger>
          </TabsList>

          {/* 备份设置 */}
          <TabsContent value="backup" className="space-y-4">
            {/* 保存目录 */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                默认文件名前缀
              </Label>
              <Input
                value={formData.saveDirectory}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    saveDirectory: e.target.value,
                  }))}
                placeholder="weibo_backup"
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                导出的备份文件将使用此前缀命名
              </div>
            </div>

            {/* 最大重试次数 */}
            <div className="space-y-2">
              <Label>最大重试次数</Label>
              <Select
                value={formData.maxRetries.toString()}
                onValueChange={value =>
                  setFormData(prev => ({
                    ...prev,
                    maxRetries: Number(value),
                  }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RETRY_OPTIONS.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground">
                网络请求失败时的重试次数
              </div>
            </div>

            <Separator />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleSave}>保存设置</Button>
            </DialogFooter>
          </TabsContent>

          {/* 数据管理 */}
          <TabsContent value="data" className="space-y-4">
            {/* 导出数据 */}
            <div className="space-y-2">
              <Label>导出设置和配置</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleExport}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                导出所有设置和任务配置
              </Button>
              <div className="text-xs text-muted-foreground">
                导出当前的所有任务配置、设置和元数据到 JSON 文件
              </div>
            </div>

            <Separator />

            {/* 导出备份数据 */}
            <div className="space-y-2">
              <Label>导出备份数据</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleExportAllBackup}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                导出所有备份数据
              </Button>
              <div className="text-xs text-muted-foreground">
                导出所有任务的备份数据（微博内容、用户信息等）到 JSON 文件
              </div>
            </div>

            <Separator />

            {/* 导入数据 */}
            <div className="space-y-2">
              <Label>导入设置</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground">
                从之前导出的 JSON 文件中恢复设置和任务
              </div>
            </div>

            <Separator />

            {/* 清空所有数据 */}
            <div className="space-y-2">
              <Label className="text-destructive">危险操作</Label>
              <AlertDialog
                open={showClearDataDialog}
                onOpenChange={setShowClearDataDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    清空所有数据
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认清空所有数据</AlertDialogTitle>
                    <AlertDialogDescription>
                      此操作将永久删除所有任务配置、设置和元数据。
                      已备份的文件不会被删除，但需要重新配置所有任务。
                      <br />
                      <br />
                      <strong>此操作不可撤销！</strong>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearData}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      确认清空
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="text-xs text-muted-foreground">
                删除所有任务、设置和应用数据
              </div>
            </div>

            {/* 错误提示 */}
            {(exportError || importError || error) && (
              <>
                <Separator />
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {exportError || importError || error}
                  </AlertDescription>
                </Alert>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
