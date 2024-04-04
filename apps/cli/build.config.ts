import { defineBuildConfig } from 'unbuild'

const inShared = [
  'ofetch',
  'p-queue',
  '@weibo-archiver/shared',
]

export default defineBuildConfig({
  entries: [{
    input: 'src/index.ts',
    name: 'weibo-archiver',
  }],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: false,
    esbuild: {
      target: 'esnext',
    },
    output: {
      // 打包 @weibo-archiver/shared 依赖，会 tree-shaking
      manualChunks(id: string) {
        if (inShared.some(dep => id.includes(dep)))
          return 'vendor'
      },
    },
  },
})
