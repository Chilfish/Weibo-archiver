import path from 'node:path'
import { defineBuildConfig } from 'unbuild'

const shared = path.resolve(path.resolve(), '../../packages/shared/src/index.ts')

export default defineBuildConfig([{
  entries: [
    'src/index.ts',
  ],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: false,
    esbuild: {
      target: 'esnext',
    },
    output: {
      paths: {
        // 重命名依赖路径
        '@weibo-archiver/shared': './shared.mjs',
      },
    },
  },
  externals: [
    'consola',
  ],
}, {
  // 曲线救国地将 shared 部分也打包进来
  entries: [{
    name: 'shared',
    input: shared,
  }],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      target: 'esnext',
    },
  },
}])
