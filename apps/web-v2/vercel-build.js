const {
  VERCEL_GIT_COMMIT_REF,
  VERCEL_GIT_COMMIT_MESSAGE,
} = process.env

// 在 main 分支，commit message 包含 web，或是 release、update deps
// 在包含 web 的任何分支
// 若不在 main 或 web 分支，则只要 commit message 包含 web

const messages = [
  'release',
  'update deps',
  'web',
]

const shouldProceed = messages.some((message) => {
  return VERCEL_GIT_COMMIT_MESSAGE.includes(message)
})

const isMainBranch = VERCEL_GIT_COMMIT_REF === 'main'
const isWebBranch = VERCEL_GIT_COMMIT_REF.includes('web')

if (
  (isMainBranch && shouldProceed)
  || isWebBranch
  || shouldProceed
) {
  console.log('✅ - Build can proceed')
  process.exit(1)
}
else {
  console.log('🛑 - Build cancelled')
  process.exit(0)
}
