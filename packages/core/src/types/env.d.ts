declare global {
  interface Window {
    $message: typeof import('naive-ui')['useMessage']
  }
}
