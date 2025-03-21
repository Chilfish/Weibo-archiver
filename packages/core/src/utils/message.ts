export function useMessage() {
  return {
    success: (message: string) => {
      console.log(message)
    },
    error: (message: string) => {
      console.log(message)
    },
    warning: (message: string) => {
      console.log(message)
    },
    info: (message: string) => {
      console.log(message)
    },
  }
}

export type UploadCustomRequestOptions = any
