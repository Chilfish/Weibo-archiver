import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface UIState {
  showAddTaskDialog: boolean
  showSettingsDialog: boolean
  showEditTaskDialog: boolean
  editingTaskId: string | null
  activeTab: string
  cookieStatus: { valid: boolean, uid?: string } | null
}

interface UIActions {
  setShowAddTaskDialog: (show: boolean) => void
  setShowSettingsDialog: (show: boolean) => void
  setShowEditTaskDialog: (show: boolean, taskId?: string) => void
  setActiveTab: (tab: string) => void
  setCookieStatus: (status: { valid: boolean, uid?: string } | null) => void
  closeAllDialogs: () => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    showAddTaskDialog: false,
    showSettingsDialog: false,
    showEditTaskDialog: false,
    editingTaskId: null,
    activeTab: 'tasks',
    cookieStatus: { valid: true },

    // Actions
    setShowAddTaskDialog: show => set({ showAddTaskDialog: show }),

    setShowSettingsDialog: show => set({ showSettingsDialog: show }),

    setShowEditTaskDialog: (show, taskId) =>
      set({
        showEditTaskDialog: show,
        editingTaskId: taskId || null,
      }),

    setActiveTab: tab => set({ activeTab: tab }),

    setCookieStatus: status => set({ cookieStatus: status }),

    closeAllDialogs: () =>
      set({
        showAddTaskDialog: false,
        showSettingsDialog: false,
        showEditTaskDialog: false,
        editingTaskId: null,
      }),
  })),
)
