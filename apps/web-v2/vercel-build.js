// vercel/<project>/setting/git
// Ignored build step

const { VERCEL_GIT_COMMIT_MESSAGE } = process.env

const shouldSkip = VERCEL_GIT_COMMIT_MESSAGE?.includes('[skip') ?? false

if (shouldSkip) {
  console.log('🛑 - Build cancelled')
  process.exit(0)
}
else {
  process.exit(1)
}
