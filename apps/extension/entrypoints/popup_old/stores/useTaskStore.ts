import type { TaskConfig, TaskStatus } from '@/types/storage'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface TaskState {
  tasks: TaskConfig[]
  taskStatuses: Record<string, TaskStatus>
  isLoading: boolean
  error: string | null
}

interface TaskActions {
  setTasks: (tasks: TaskConfig[]) => void
  addTask: (task: TaskConfig) => void
  updateTask: (taskId: string, updates: Partial<TaskConfig>) => void
  removeTask: (taskId: string) => void
  setTaskStatuses: (statuses: Record<string, TaskStatus>) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

type TaskStore = TaskState & TaskActions

export const useTaskStore = create<TaskStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    tasks: [],
    taskStatuses: {},
    isLoading: false,
    error: null,

    // Actions
    setTasks: tasks => set({ tasks }),

    addTask: task =>
      set(state => ({
        tasks: [...state.tasks, task],
        error: null,
      })),

    updateTask: (taskId, updates) =>
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task,
        ),
        error: null,
      })),

    removeTask: taskId =>
      set((state) => {
        const { [taskId]: removed, ...restStatuses } = state.taskStatuses
        return {
          tasks: state.tasks.filter(task => task.id !== taskId),
          taskStatuses: restStatuses,
          error: null,
        }
      }),

    setTaskStatuses: statuses => set({ taskStatuses: statuses }),

    updateTaskStatus: (taskId, status) =>
      set(state => ({
        taskStatuses: {
          ...state.taskStatuses,
          [taskId]: status,
        },
      })),

    setLoading: loading => set({ isLoading: loading }),

    setError: error => set({ error }),

    clearError: () => set({ error: null }),
  })),
)

// Selectors
export const useTasksSelector = () => useTaskStore(state => state.tasks)
export const useTaskStatusesSelector = () =>
  useTaskStore(state => state.taskStatuses)
export const useTaskLoadingSelector = () =>
  useTaskStore(state => state.isLoading)
export const useTaskErrorSelector = () => useTaskStore(state => state.error)
