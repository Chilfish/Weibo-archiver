import { defineBuildConfig } from 'unbuild'

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
      // 打包所有的 node_modules 依赖，会 tree-shaking
      // 所以就只需要将依赖都放在 devDependencies 下就行了
      manualChunks(id: string) {
        if (id.includes('node_modules'))
          return 'vendor'
      },
    },
  },
})
